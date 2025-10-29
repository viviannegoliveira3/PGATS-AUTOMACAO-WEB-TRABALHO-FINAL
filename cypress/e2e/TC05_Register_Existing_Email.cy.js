import { faker } from '@faker-js/faker';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

describe('Test Case 5: Register User with existing email', () => {
    // Ensure the 'existing' user exists before running the test
    before(() => {
        const existing = {
            name: 'Existing User',
            email: 'existing.email@test.com',
            password: 'Password123!',
            title: 'Mr',
            birth_date: '10', birth_month: '5', birth_year: '1990',
            firstname: 'Existing', lastname: 'User',
            address1: '123 Main St', country: 'Canada',
            state: 'State', city: 'City', zipcode: '00000', mobile_number: '0000000000'
        };

        // Create the account via API. If it already exists the server may return an error or 409;
        // we don't fail the test here — just attempt to create so the precondition holds.
        cy.request({
            method: 'POST',
            url: '/api/createAccount',
            form: true,
            body: existing,
            failOnStatusCode: false
        }).then(response => {
            // Try to parse response body if present for basic sanity check
            try {
                const responseBody = JSON.parse(response.body);
                // Accept 201 (created) or 409/400 (already exists) as acceptable preconditions
                expect([201, 200, 409, 400]).to.include(responseBody.responseCode);
            } catch (err) {
                // If parsing fails, just continue — the API attempt was made
                // (we don't want to block the test if the server returns HTML)
            }
        });
    });
    it('should show an error message when trying to register with an existing email', () => {
        const user = { name: faker.person.fullName(), email: 'existing.email@test.com' };

        HomePage.visit();
        HomePage.getSignupLoginButton().click();
        LoginPage.getNewUserSignupHeader().should('be.visible');
        LoginPage.getNameInput().type(user.name);
        LoginPage.getEmailInput().type(user.email);
        LoginPage.getSignupButton().click();
        // Wait a bit longer and use a more resilient selector for the signup error message
        LoginPage.getSignupErrorMessage('Email Address already exist!', { timeout: 10000 }).should('be.visible');
    });
});
