class PaymentPage {
    getNameOnCardInput = () => cy.get('[data-qa="name-on-card"]');
    getCardNumberInput = () => cy.get('[data-qa="card-number"]');
    getCvcInput = () => cy.get('[data-qa="cvc"]');
    getExpiryMonthInput = () => cy.get('[data-qa="expiry-month"]');
    getExpiryYearInput = () => cy.get('[data-qa="expiry-year"]');
    // Try multiple selectors and increase timeout since payment forms can be slow to load/process
    getPayAndConfirmButton = () => cy.get('[data-qa="pay-and-confirm-order"], button[type="submit"], .submit-button, #submit-payment', { timeout: 10000 }).filter(':visible').first();
    getSuccessMessage = () => cy.get('.col-sm-9 > p');
}
export default new PaymentPage();
