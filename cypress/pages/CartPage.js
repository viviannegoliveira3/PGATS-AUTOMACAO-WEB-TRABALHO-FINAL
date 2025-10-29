class CartPage {
    getProceedToCheckoutButton = () => cy.get('.col-sm-6 .btn');
    getCartDescription = (productName) => cy.get('.cart_description a').contains(productName);
    getRegisterLoginLink = () => cy.get('.modal-body a[href="/login"]');
}
export default new CartPage();
