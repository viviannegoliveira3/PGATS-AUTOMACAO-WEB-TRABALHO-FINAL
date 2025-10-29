import { faker } from '@faker-js/faker';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

describe('Test Cases 2, 3, 4: Login and Logout User', () => {
    // Usamos o beforeEach para garantir que o estado de login seja preparado para cada teste
    beforeEach(function() {
        // Geramos os dados do usuário primeiro e criamos o alias aqui
        // para que ele esteja disponível nos testes com cy.get('@user').
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            title: 'Mr',
            birth_date: '10', birth_month: '5', birth_year: '1990',
            firstname: faker.person.firstName(), lastname: faker.person.lastName(),
            address1: faker.location.streetAddress(), country: 'Canada',
            state: faker.location.state(), city: faker.location.city(),
            zipcode: faker.location.zipCode(), mobile_number: faker.phone.number()
        };

        // Salvamos o alias diretamente aqui (fora do callback de cy.session)
        cy.wrap(user).as('user');

        // Usamos cy.session para criar/reativar a sessão no servidor usando os mesmos dados
        cy.session(['registeredUser', user.email], () => {
            cy.request({
                method: 'POST',
                url: '/api/createAccount',
                form: true,
                body: user
            }).then(response => {
                const responseBody = JSON.parse(response.body);
                expect(responseBody.responseCode).to.eq(201);
            });
        });

        HomePage.visit();
    });

    it('TC2: should login with correct credentials and TC4: then logout', function() {
        // O cy.session já nos deixa logados, mas para seguir a lógica do seu teste, vamos fazer o login novamente.
        // Em um cenário real, o cy.session já cuidaria disso.
        // 2. Acessamos o alias com cy.get()
        cy.get('@user').then(user => {
            cy.login(user.email, user.password);
            HomePage.getLoggedInAsText().should('contain.text', user.name);
            HomePage.getLogoutButton().click();
            cy.url().should('include', '/login');
        });
    });

    it('TC3: should fail to login with incorrect credentials', function() {
        cy.get('@user').then(user => {
            cy.login(user.email, 'wrongpassword');
            LoginPage.getLoginErrorText().should('be.visible').and('contain.text', 'incorrect!');
        });
    });
});
