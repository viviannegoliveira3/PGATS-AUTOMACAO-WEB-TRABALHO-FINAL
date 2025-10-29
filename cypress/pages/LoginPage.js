class LoginPage {
    getNewUserSignupHeader = () => cy.get('.signup-form > h2');
    getNameInput = () => cy.get('[data-qa="signup-name"]');
    getEmailInput = () => cy.get('[data-qa="signup-email"]');
    getSignupButton = () => cy.get('[data-qa="signup-button"]');
    getLoginEmailInput = () => cy.get('[data-qa="login-email"]');
    getLoginPasswordInput = () => cy.get('[data-qa="login-password"]');
    getLoginButton = () => cy.get('[data-qa="login-button"]');
    getLoginErrorText = () => cy.get('.login-form form p');
    getSignupErrorText = () => cy.get('.signup-form form p');

    // More resilient selector: find the error text anywhere inside the signup form
    // Accepts Cypress options (e.g., { timeout: 10000 })
    getSignupErrorMessage = (text = 'Email Address already exist!', options = {}) => cy.contains('.signup-form', text, options);
}
export default new LoginPage();
