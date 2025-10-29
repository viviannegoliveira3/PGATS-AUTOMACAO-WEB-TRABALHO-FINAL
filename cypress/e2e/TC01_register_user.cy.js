import { faker } from '@faker-js/faker';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AccountCreatedPage from '../pages/AccountCreatedPage';

describe('Test Case 1: Register User', () => {
    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobileNumber: faker.phone.number()
    };

    it('should register a new user and then delete the account', () => {
        HomePage.visit();
        cy.url().should('eq', 'https://automationexercise.com/');
        HomePage.getSignupLoginButton().click();
        LoginPage.getNewUserSignupHeader().should('be.visible');
        LoginPage.getNameInput().type(user.name);
        LoginPage.getEmailInput().type(user.email);
        LoginPage.getSignupButton().click();
        
        // Aguardar o carregamento da página de cadastro
        cy.get('.login-form', { timeout: 20000 }).should('be.visible');
        cy.contains('Enter Account Information', { timeout: 20000 }).should('be.visible');
        
        // Aguardar e verificar se o formulário está visível antes de interagir
        cy.get('#id_gender1', { timeout: 20000 }).should('be.visible');
        SignupPage.getTitleRadio('Mr').check();
        SignupPage.getPasswordInput().type(user.password);
        SignupPage.getDayOfBirth().select('10');
        SignupPage.getMonthOfBirth().select('May');
        SignupPage.getYearOfBirth().select('1990');
        SignupPage.getFirstNameInput().type(user.firstName);
        SignupPage.getLastNameInput().type(user.lastName);
        SignupPage.getAddressInput().type(user.address);
        SignupPage.getCountrySelect().select('Canada');
        SignupPage.getStateInput().type(user.state);
        SignupPage.getCityInput().type(user.city);
        SignupPage.getZipcodeInput().type(user.zipcode);
        SignupPage.getMobileNumberInput().type(user.mobileNumber);
        SignupPage.getCreateAccountButton().click();

        AccountCreatedPage.getAccountCreatedHeader().should('be.visible');
        AccountCreatedPage.getContinueButton().click();
        HomePage.getLoggedInAsText().should('contain.text', user.name);
        HomePage.getDeleteAccountButton().click();
        AccountCreatedPage.getAccountDeletedHeader().should('be.visible');
        AccountCreatedPage.getContinueButton().click();
    });
});
