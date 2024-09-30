const DataRegisterLogin = require("../../fixtures/register_login.json");

class registerloginPage {
  WhereText(where) {
    return cy.get(where);
  }
  //Action
  PageSignup(where) {
    this.WhereText(where).should(
      "have.text",
      DataRegisterLogin.checkPage.Register
    );
  }

  PageRegisterSuccess(where) {
    this.WhereText(where).should(
      "have.text",
      DataRegisterLogin.checkPage.RegisterSuccess
    );
  }

  PageDeleteUserSuccess(where) {
    this.WhereText(where).should(
      "have.text",
      DataRegisterLogin.checkPage.DeleteAccount
    );
  }
}
export default new registerloginPage();
