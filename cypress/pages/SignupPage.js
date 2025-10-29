class SignupPage {
    getTitleRadio = (title) => cy.get(`#id_gender${title === 'Mr' ? '1' : '2'}`, { timeout: 20000 });
    getPasswordInput = () => cy.get('[data-qa="password"]');
    getDayOfBirth = () => cy.get('[data-qa="days"]');
    getMonthOfBirth = () => cy.get('[data-qa="months"]');
    getYearOfBirth = () => cy.get('[data-qa="years"]');
    getFirstNameInput = () => cy.get('[data-qa="first_name"]');
    getLastNameInput = () => cy.get('[data-qa="last_name"]');
    getAddressInput = () => cy.get('[data-qa="address"]');
    getCountrySelect = () => cy.get('[data-qa="country"]');
    getStateInput = () => cy.get('[data-qa="state"]');
    getCityInput = () => cy.get('[data-qa="city"]');
    getZipcodeInput = () => cy.get('[data-qa="zipcode"]');
    getMobileNumberInput = () => cy.get('[data-qa="mobile_number"]');
    getCreateAccountButton = () => cy.get('[data-qa="create-account"]');
}
export default new SignupPage();
