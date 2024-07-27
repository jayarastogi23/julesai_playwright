import { Page, expect } from "@playwright/test";

export default class Login {
  private emailField: string = 'input[name="email"]';
  private emailRequired: string = 'div[data-test-id="input-email"] + div';
  private passwordField: string = 'input[name="password"]';
  private passwordRequired: string = 'div[data-test-id="input-password"] + div';
  private signInBtn: string = 'button[data-test-id="signin"] .MuiButton-label';
  private signInMicrosoftBtn: string = 'button[data-test-id="signinMicrosoft"] .MuiButton-label';
  private signInGoogleBtn: string = 'button[data-test-id="signinGoogle"] .MuiButton-label';
  private errorMessage: string = "#notistack-snackbar";
  private userProfile: string = 'div[data-test-id="header-menu"] .UserAvatar';

  constructor(private page: Page) {}

  verifyEmailField = async () => {
    await expect(this.page.locator(this.emailField), "Verify email field is visible").toBeVisible();
  };

  enterEmail = async (email: string) => {
    await this.page.locator(this.emailField).fill(email);
  };

  emailRequiredField = async () => {
    return await this.page.locator(this.emailRequired);
  };

  verifyPasswordField = async () => {
    await expect(this.page.locator(this.passwordField), "Verify password field is visible").toBeVisible();
  };

  enterPassword = async (password: string) => {
    await this.page.locator(this.passwordField).fill(password);
  };

  passwordFieldRequired = async () => {
    return await this.page.locator(this.passwordRequired);
  };

  loginUser = async (email: string, password: string) => {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignInBtn();
  };

  verifySignInBtn = async () => {
    await expect(this.page.locator(this.signInBtn), "verify sign in button is visible").toBeVisible();
  };

  clickSignInBtn = async () => {
    await this.page.locator(this.signInBtn).click();
  };

  verifySignInMicrosoftBtn = async () => {
    await expect(this.page.locator(this.signInMicrosoftBtn), "Verify sign in with microsoft button is visible").toBeVisible();
  };

  clickSignInMicrosoftBtn = async () => {
    await this.page.locator(this.signInMicrosoftBtn).click();
    await this.page.waitForLoadState("networkidle");
  };

  verifySignInGoogleBtn = async () => {
    await expect(this.page.locator(this.signInGoogleBtn), "Verify sign in with google button is visible").toBeVisible();
  };

  clickSignInGoogleBtn = async () => {
    await this.page.locator(this.signInGoogleBtn).click();
    await this.page.waitForLoadState("networkidle");
  };

  getPageTitle = async () => {
    return await this.page.title();
  };

  getErrorMessage = async () => {
    return await this.page.locator(this.errorMessage);
  };

  getUserProfile = async () => {
    return await this.page.locator(this.userProfile);
  };
}
