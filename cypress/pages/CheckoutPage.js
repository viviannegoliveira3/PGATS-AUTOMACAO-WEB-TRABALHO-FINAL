class CheckoutPage {
    getCommentInput = () => cy.get('textarea[name="message"]');
    getPlaceOrderButton = () => cy.get('a[href="/payment"]');
}
export default new CheckoutPage();
