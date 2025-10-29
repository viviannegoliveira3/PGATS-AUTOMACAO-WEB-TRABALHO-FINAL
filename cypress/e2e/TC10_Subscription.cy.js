import { faker } from '@faker-js/faker';
import HomePage from '../pages/HomePage';

describe('Test Case 10: Verify Subscription in home page', () => {
    it('should subscribe with a valid email', () => {
        HomePage.visit();
        cy.scrollTo('bottom');
        HomePage.getSubscriptionHeader().should('be.visible');
        HomePage.getSubscriptionEmailInput().type(faker.internet.email());
        HomePage.getSubscriptionButton().click();
        HomePage.getSuccessAlert().should('be.visible').and('contain.text', 'You have been successfully subscribed!');
    });
});
