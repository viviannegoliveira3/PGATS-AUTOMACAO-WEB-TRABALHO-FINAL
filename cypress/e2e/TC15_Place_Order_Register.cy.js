import { faker } from '@faker-js/faker';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import SignupPage from '../pages/SignupPage';
import AccountCreatedPage from '../pages/AccountCreatedPage';
import CheckoutPage from '../pages/CheckoutPage';
import PaymentPage from '../pages/PaymentPage';

describe('Test Case 15: Place Order: Register before Checkout', () => {
    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobileNumber: faker.phone.number()
    };

    it('should register, add product to cart, and place order', () => {
        HomePage.visit();
        HomePage.getProductsButton().click();
        // Click Add to Cart for the first product (use index to avoid ambiguous selectors)
        ProductsPage.getAllProductItems().eq(0).then($product => {
            // Find add-to-cart anchors inside this product and click the first DOM element explicitly
            const anchors = $product.find('.productinfo a[data-product-id]');
            // wrap the first anchor element and click it
            cy.wrap(anchors[0]).click();
        });
        ProductsPage.getContinueShoppingButton().click();
        HomePage.getCartButton().click();
        CartPage.getProceedToCheckoutButton().click();
        CartPage.getRegisterLoginLink().click();

        // Registro
        LoginPage.getNameInput().type(user.name);
        LoginPage.getEmailInput().type(user.email);
        LoginPage.getSignupButton().click();
        SignupPage.getTitleRadio('Mr').check();
        SignupPage.getPasswordInput().type(user.password);
        SignupPage.getDayOfBirth().select('10');
        SignupPage.getMonthOfBirth().select('May');
        SignupPage.getYearOfBirth().select('1990');
        SignupPage.getFirstNameInput().type(user.firstName);
        SignupPage.getLastNameInput().type(user.lastName);
        SignupPage.getAddressInput().type(user.address);
        SignupPage.getCountrySelect().select('Canada');
        SignupPage.getStateInput().type(user.state);
        SignupPage.getCityInput().type(user.city);
        SignupPage.getZipcodeInput().type(user.zipcode);
        SignupPage.getMobileNumberInput().type(user.mobileNumber);
        SignupPage.getCreateAccountButton().click();
        AccountCreatedPage.getAccountCreatedHeader().should('be.visible');
        AccountCreatedPage.getContinueButton().click();

        // Checkout
        HomePage.getLoggedInAsText().should('contain.text', user.name);
        HomePage.getCartButton().click();
        CartPage.getProceedToCheckoutButton().click();
        CheckoutPage.getCommentInput().type('Placing order as a test.');
        CheckoutPage.getPlaceOrderButton().click();

        // Pagamento - verificar página e form
        cy.url().should('include', '/payment');
        cy.screenshot('payment-form-start');
        
        // Aguardar form carregar e preencher
        cy.get('form').should('be.visible');
        PaymentPage.getNameOnCardInput().should('be.visible').clear().type(user.name);
        PaymentPage.getCardNumberInput().should('be.visible').clear().type(faker.finance.creditCardNumber());
        PaymentPage.getCvcInput().should('be.visible').clear().type(faker.finance.creditCardCVV());
        PaymentPage.getExpiryMonthInput().should('be.visible').clear().type('12');
        PaymentPage.getExpiryYearInput().should('be.visible').clear().type('2030');
        
        // Verificar se form está pronto (campos required preenchidos, sem erros)
        cy.formShouldBeReady('form');
        cy.screenshot('payment-form-filled');
        
        // Aguardar botão ficar clicável
        cy.wait(1000); // dar tempo para o form processar
        PaymentPage.getPayAndConfirmButton().as('submitBtn');
        cy.get('@submitBtn')
            .should('be.visible')
            .and('not.be.disabled')
            .click();
            
        // Screenshot antes de aguardar confirmação
        cy.screenshot('payment-submitted');
            
        // Aguardar mensagem de sucesso com timeout maior
        PaymentPage.getSuccessMessage().should('be.visible', { timeout: 10000 });
        cy.screenshot('payment-success');
    });
});
