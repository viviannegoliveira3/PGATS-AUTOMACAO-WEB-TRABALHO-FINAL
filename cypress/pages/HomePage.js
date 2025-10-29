class HomePage {
    visit() {
        // Interceptar recursos não essenciais e scripts de terceiros
        cy.intercept('**/*.{jpg,jpeg,png,gif,svg}', { statusCode: 200, body: '' });
        cy.intercept('**/sodar**', { statusCode: 200, body: '' });
        cy.intercept('**/pagead**', { statusCode: 200, body: '' });
        cy.intercept('**/show_ads_impl**', { statusCode: 200, body: '' });
        cy.intercept('**/adsbygoogle**', { statusCode: 200, body: '' });
        cy.intercept('**/googleads**', { statusCode: 200, body: '' });
        
        // Tentar visitar a página com retry e timeout estendido
        cy.visit('/', {
            timeout: 120000,
            retryOnStatusCodeFailure: true,
            retryOnNetworkFailure: true,
            onBeforeLoad(win) {
                // Prevenir carregamento de recursos do AdSense e outros scripts de terceiros
                win.addEventListener('beforeload', (event) => {
                    const url = event.url || '';
                    if (url.includes('pagead') || 
                        url.includes('googleads') || 
                        url.includes('sodar') || 
                        url.includes('adsbygoogle')) {
                        event.preventDefault();
                    }
                });

                // Ignorar erros de console não críticos
                cy.stub(win.console, 'error').callsFake((...args) => {
                    const msg = args[0];
                    if (!msg?.includes('favicon.ico') && 
                        !msg?.includes('sodar') && 
                        !msg?.includes('pagead') &&
                        !msg?.includes('google') &&
                        !msg?.includes('ads')) {
                        console.error(...args);
                    }
                });
            }
        });

        // Aguardar elementos essenciais da página inicial com retry aprimorado
        cy.get('body', { timeout: 30000 })
            .should('be.visible')
            .and('not.have.class', 'loading');
            
        // Verificar elementos específicos da home com retry
        cy.get('.shop-menu > .nav', { timeout: 20000 }).should('be.visible');
        cy.get('a[href="/login"]', { timeout: 20000 }).should('be.visible');
        
        // Garantir que scripts de anúncios não bloqueiem o carregamento
        cy.window().then(win => {
            if (win.stop) win.stop();
            // Limpar qualquer intervalo pendente do AdSense
            const intervals = win.setInterval(() => {}, 100000);
            for (let i = 0; i < intervals; i++) {
                win.clearInterval(i);
            }
        });
    }
    
    getSignupLoginButton = () => cy.get('a[href="/login"]');
    getLoggedInAsText = () => cy.get('li:nth-child(10) > a');
    getDeleteAccountButton = () => cy.get('a[href="/delete_account"]');
    getLogoutButton = () => cy.get('a[href="/logout"]');
    getContactUsButton = () => cy.get('a[href="/contact_us"]');
    getProductsButton = () => cy.get('a[href="/products"]');
    getSubscriptionHeader = () => cy.get('.single-widget h2');
    getSubscriptionEmailInput = () => cy.get('#susbscribe_email');
    getSubscriptionButton = () => cy.get('#subscribe');
    getSuccessAlert = () => cy.get('.alert-success');
    // Return the first visible cart link to avoid ambiguous multiple matches
    getCartButton = () => cy.get('a[href="/view_cart"]').filter(':visible').first();
}
export default new HomePage();
