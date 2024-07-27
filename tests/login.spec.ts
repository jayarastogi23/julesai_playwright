import { test, expect } from "@playwright/test";
import Login from "../pages/Login";

test.describe("Login Scenarios", async () => {
  test("Verify all the fields and buttons are visible on the page", async ({ page }) => {
    const login = new Login(page);
    await page.goto("https://demo.haroldwaste.com/");
    await login.verifyEmailField();
    await login.verifyPasswordField();
    await login.verifySignInBtn();
    await login.verifySignInMicrosoftBtn();
    await login.verifySignInGoogleBtn();
  });

  test("Verify that the Sign In with Microsoft button is redirecting to login microsoft account", async ({ page }) => {
    const login = new Login(page);
    await page.goto("https://demo.haroldwaste.com/");
    await login.clickSignInMicrosoftBtn();
    expect(await login.getPageTitle(), "Verify Microsoft Sign in button redirecting to login microsoft account").toEqual("Sign in to your account");
  });

  test("Verify that the Sign In with Google button is redirecting to login google account", async ({ page }) => {
    const login = new Login(page);
    await page.goto("https://demo.haroldwaste.com/");
    await login.clickSignInGoogleBtn();
    expect(await login.getPageTitle(), "Verify Google Sign in button redirecting to login google account").toEqual("Sign in - Google Accounts");
  });

  test("Verify that the user is not able to login with empty email and password", async ({ page }) => {
    const login = new Login(page);
    await page.goto("https://demo.haroldwaste.com/");
    await login.loginUser("", "");
    await expect(await login.emailRequiredField(), "Verify that the Email Required error is visible").toBeVisible();
    await expect(await login.passwordFieldRequired(), "Verify that the Password Required error is visible").toBeVisible();
  });

  test("Verify that the user is not able to login with wrong email and correct password", async ({ page }) => {
    const login = new Login(page);
    await page.goto("https://demo.haroldwaste.com/");
    await login.loginUser("test@test.com", process.env.password!);
    await expect(await login.getErrorMessage()).toHaveText("Your email and/or password are incorrects");
  });

  test("Verify that the user is not able to login with correct email and wrong password", async ({ page }) => {
    const login = new Login(page);
    await page.goto("https://demo.haroldwaste.com/");
    await login.loginUser(process.env.email!, "Test@12345");
    await expect(await login.getErrorMessage()).toHaveText("Your email and/or password are incorrects");
  });

  test("Verify that the user is able to login with correct email and password", async ({ page }) => {
    const login = new Login(page);
    await page.goto("https://demo.haroldwaste.com/");
    await login.loginUser(process.env.email!, process.env.password!);
    await expect(await login.getUserProfile()).toBeVisible();
  });
});
