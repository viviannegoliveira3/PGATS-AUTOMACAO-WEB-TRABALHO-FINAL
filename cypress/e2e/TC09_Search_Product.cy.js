import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';

describe('Test Case 9: Search Product', () => {
    it('should search for a product and verify the results', () => {
        const searchTerm = 'Tshirt';
        const normalize = (s = '') => s.replace(/[-\s]/g, '').toLowerCase();

        HomePage.visit();
        HomePage.getProductsButton().click();
        ProductsPage.getSearchInput().clear().type(searchTerm);
        ProductsPage.getSearchButton().click();
        ProductsPage.getSearchedProductsHeader().should('be.visible');
        ProductsPage.getAllProductItems().each(($el) => {
            cy.wrap($el).find('.productinfo p').invoke('text').then(text => {
                expect(normalize(text)).to.contain(normalize(searchTerm));
            });
        });
    });
});
