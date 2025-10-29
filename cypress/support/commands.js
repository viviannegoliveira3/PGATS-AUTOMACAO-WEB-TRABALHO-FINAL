import { faker } from '@faker-js/faker';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

// Comando de login existente
Cypress.Commands.add('login', (email, password) => {
  HomePage.getSignupLoginButton().click();
  // Use the email parameter provided by the test (was hardcoded before)
  LoginPage.getLoginEmailInput().clear().type(email);
  LoginPage.getLoginPasswordInput().type(password);
  LoginPage.getLoginButton().click();
});

// Comando para clicar com retry mais robusto e tratamento de erros
Cypress.Commands.add('retryClick', { prevSubject: 'element' }, (subject, options = {}) => {
  const timeout = options.timeout || 10000;
  const interval = options.interval || 1000;

  return cy.wrap(subject, { timeout })
    .should('be.visible')
    .and('not.be.disabled')
    .then($el => {
      const attempt = () => {
        if (!Cypress.dom.isVisible($el)) {
          cy.wait(interval);
          cy.wrap($el, { timeout: interval })
            .should('be.visible')
            .and('not.be.disabled');
        }
        
        // Tenta o clique com tratamento de erro
        try {
          cy.wrap($el, { timeout: interval }).click({
            timeout: interval,
            waitForAnimations: true,
            force: false
          });
        } catch (err) {
          // Se falhar, tenta novamente após pequeno delay
          cy.wait(500);
          cy.wrap($el, { timeout: interval }).click({
            timeout: interval,
            waitForAnimations: true,
            force: true
          });
        }
      };
      
      attempt();
    });
});

// Comando para verificar se um formulário está pronto para submissão
Cypress.Commands.add('formShouldBeReady', (formSelector) => {
  // Pegar o primeiro formulário que corresponde ao seletor
  cy.get(formSelector).first().then($form => {
    // Verificar campos required
    const requiredInputs = $form.find('input[required]');
    if (requiredInputs.length > 0) {
      requiredInputs.each((_, input) => {
        expect(input.value).to.not.be.empty;
      });
    }
    
    // Verificar erros
    const errorElements = $form.find('.error, .invalid, .has-error');
    expect(errorElements.length).to.equal(0);
  });
});
