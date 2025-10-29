class ContactUsPage {
    getGetInTouchHeader = () => cy.get('.contact-form h2');
    getNameInput = () => cy.get('[data-qa="name"]');
    getEmailInput = () => cy.get('[data-qa="email"]');
    getSubjectInput = () => cy.get('[data-qa="subject"]');
    getMessageInput = () => cy.get('[data-qa="message"]');
    getSubmitButton = () => cy.get('[data-qa="submit-button"]');
    getSuccessMessage = () => cy.get('.status.alert.alert-success');
    getUploadFileInput = () => cy.get('input[name="upload_file"]');
}
export default new ContactUsPage();
