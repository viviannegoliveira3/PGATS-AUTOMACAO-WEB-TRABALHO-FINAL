class AccountCreatedPage {
    getAccountCreatedHeader = () => cy.get('[data-qa="account-created"]');
    getContinueButton = () => cy.get('[data-qa="continue-button"]');
    getAccountDeletedHeader = () => cy.get('[data-qa="account-deleted"]');
}
export default new AccountCreatedPage();
