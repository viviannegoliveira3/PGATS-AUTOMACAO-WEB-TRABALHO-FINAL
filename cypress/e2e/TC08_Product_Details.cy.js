import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';

describe('Test Case 8: Verify All Products and product detail page', () => {
    it('should navigate to products page and verify product details', () => {
        HomePage.visit();
        HomePage.getProductsButton().click();
        cy.url().should('include', '/products');
        ProductsPage.getAllProductsHeader().should('be.visible');
        ProductsPage.getViewProductButtonOfFirstProduct().click();
        cy.url().should('include', '/product_details/1');
        ProductsPage.getProductName().should('be.visible');
        // Adicione mais asserções para categoria, preço, etc.
    });
});
