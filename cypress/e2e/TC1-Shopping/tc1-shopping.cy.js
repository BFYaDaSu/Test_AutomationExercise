import registerloginPage from "../../support/page_object/registerloginPage.js";
const DataRegisterLogin = require("../../fixtures/register_login.json");
import "cypress-file-upload";

describe("Shopping", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com/");
  });
  //Register
  function registerUser() {
    cy.clickByText("Signup / Login");
    cy.CheckURL("https://automationexercise.com/login");
    cy.AddData(
      '[data-qa="signup-name"]',
      DataRegisterLogin.Data.FirstName + " " + DataRegisterLogin.Data.LastName
    );
    cy.AddData('[data-qa="signup-email"]', DataRegisterLogin.Data.Email);
    cy.clickByButton('[data-qa="signup-button"]');
    cy.get(":nth-child(4) > .top").find('input[type="radio"]').check();
    cy.AddData("form > :nth-child(5)", DataRegisterLogin.Data.Password);
    cy.SelectBirthday();
    cy.get("#newsletter").check();
    cy.get("#optin").check();
    cy.AddData('[data-qa="first_name"]', DataRegisterLogin.Data.FirstName);
    cy.AddData('[data-qa="last_name"]', DataRegisterLogin.Data.LastName);
    cy.FillAddress();
    cy.AddData('[data-qa="mobile_number"]', DataRegisterLogin.Data.Number);
    cy.clickByButton('[data-qa="create-account"]');
    registerloginPage.PageRegisterSuccess("b");
    cy.clickByButton('[data-qa="continue-button"]');
    cy.contains("Logged in ");
  }

  //login
  function login() {
    cy.get('[data-qa="login-email"]').clear();
    cy.get('[data-qa="login-password"]').clear();
    cy.AddData('[data-qa="login-email"]', DataRegisterLogin.Data.Email);
    cy.AddData('[data-qa="login-password"]', DataRegisterLogin.Data.Password);
    cy.clickByButton('[data-qa="login-button"]');
    cy.contains("Logged in ");
  }

  //Logout
  function logout() {
    cy.clickByText("Logout");
    cy.CheckURL("https://automationexercise.com/login");
  }

  //DeleteAccount;
  function DeleteAccount() {
    cy.clickByText("Delete Account");
    registerloginPage.PageDeleteUserSuccess("b");
  }

  it("tc-01-RegisterLogin", () => {
    //Register
    registerUser();

    //Logout
    logout();

    //Register User with existing email
    cy.AddData(
      '[data-qa="signup-name"]',
      DataRegisterLogin.Data.FirstName + " " + DataRegisterLogin.Data.LastName
    );
    cy.AddData('[data-qa="signup-email"]', DataRegisterLogin.Data.Email);
    cy.clickByButton('[data-qa="signup-button"]');
    cy.contains("Email Address already exist!");

    //Login with incorrect email and password

    cy.get('[data-qa="signup-name"]').clear();
    cy.get('[data-qa="signup-email"]').clear();
    cy.AddData(
      '[data-qa="login-email"]',
      DataRegisterLogin.IncorrectData.Email
    );
    cy.AddData(
      '[data-qa="login-password"]',
      DataRegisterLogin.IncorrectData.Password
    );
    cy.clickByButton('[data-qa="login-button"]');
    cy.contains("Your email or password is incorrect! ");

    //Login with correct email and password
    login();

    //Delete Account
    DeleteAccount();

    //Contact Us
    cy.clickByText("Contact us");
    cy.contains("Get In Touch");
    cy.AddData(
      '[data-qa="name"]',
      DataRegisterLogin.Data.FirstName + " " + DataRegisterLogin.Data.LastName
    );
    cy.AddData('[data-qa="email"]', DataRegisterLogin.Data.Email);
    cy.AddData('[data-qa="subject"]', "Test Send File");
    cy.AddData('[data-qa="message"]', "Test test");
    cy.get(":nth-child(6) > .form-control").attachFile("cat.jpg");
    cy.clickByText("Submit");
    cy.contains("submitted successfully");
  });
  it("tc-02-BuyProducts", () => {
    // Recommended items
    cy.get(".recommended_items > .title").scrollIntoView().should("be.visible");
    cy.clickByButton(
      ".active > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn"
    );
    cy.clickByText("View Cart");
    cy.clickByText("Products");

    //Search
    cy.AddData("#search_product", "top");
    cy.clickByButton("#submit_search");

    cy.wait(3000);
    cy.clickByButton(
      ":nth-child(4) > .product-image-wrapper > .choose > .nav > li > a"
    );
    cy.url().should("include", "/product_details");
    cy.clickByButton(":nth-child(5) > .btn"); // Add to cart
    cy.clickByButton(".modal-footer > .btn");
    cy.clickByText("Women");
    cy.clickByText("Saree");
    cy.clickByButton(
      ":nth-child(3) > .product-image-wrapper > .choose > .nav > li > a"
    );
    //Brand
    cy.clickByText("Polo");
    cy.clickByButton(
      ":nth-child(5) > .product-image-wrapper > .choose > .nav > li > a"
    );
    cy.clickByButton(":nth-child(5) > .btn");
    cy.clickByText("Continue Shopping");

    //Cart
    cy.clickByButton(".shop-menu > .nav > :nth-child(3) > a");
    cy.clickByText("Proceed To Checkout");
    cy.clickByButton(".modal-body > :nth-child(2) > a > u");

    registerUser();

    cy.clickByButton(".shop-menu > .nav > :nth-child(3) > a");
    cy.clickByText("Proceed To Checkout");

    cy.clickByButton(":nth-child(7) > .btn");

    cy.AddData(
      '[data-qa="name-on-card"]',
      DataRegisterLogin.Data.FirstName + " " + DataRegisterLogin.Data.LastName
    );
    cy.AddData('[data-qa="card-number"]', "1");
    cy.AddData('[data-qa="cvc"]', "111");
    cy.AddData('[data-qa="expiry-month"]', "11");
    cy.AddData('[data-qa="expiry-year"]', "2027");

    cy.clickByText("Pay and Confirm Order");
    cy.clickByText("Download Invoice");
    DeleteAccount();
  });
});
