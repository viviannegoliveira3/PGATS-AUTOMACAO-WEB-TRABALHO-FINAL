import HomePage from '../pages/HomePage';
import ContactUsPage from '../pages/ContactUsPage';

describe('Test Case 6: Contact Us Form', () => {
    beforeEach(() => {
        cy.fixture('contactUsData').as('contactData');
    });

    it('should submit the contact us form successfully', function() {
        HomePage.visit();
        HomePage.getContactUsButton().click();
        ContactUsPage.getGetInTouchHeader().should('be.visible');
        ContactUsPage.getNameInput().type(this.contactData.name);
        ContactUsPage.getEmailInput().type(this.contactData.email);
        ContactUsPage.getSubjectInput().type(this.contactData.subject);
        ContactUsPage.getMessageInput().type(this.contactData.message);
        ContactUsPage.getUploadFileInput().selectFile('cypress/fixtures/contactUsData.json');
        ContactUsPage.getSubmitButton().click();
        cy.on('window:confirm', () => true); // Clica em OK no alerta do navegador
        ContactUsPage.getSuccessMessage().should('be.visible');
    });
});
