class ProductsPage {
    getAllProductsHeader = () => cy.get('.features_items .title');
    getViewProductButtonOfFirstProduct = () => cy.get('a[href="/product_details/1"]');
    getProductName = () => cy.get('.product-information h2');
    getSearchInput = () => cy.get('#search_product');
    getSearchButton = () => cy.get('#submit_search');
    getSearchedProductsHeader = () => cy.get('.features_items .title');
    getAllProductItems = () => cy.get('.product-image-wrapper');
    // Ensure we target a visible add-to-cart button and return the first match
    getAddToCartButton = (productId) => cy.get(`.productinfo a[data-product-id="${productId}"]`).filter(':visible').first();
    getContinueShoppingButton = () => cy.get('.modal-footer button');
}
export default new ProductsPage();
