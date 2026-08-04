import { test, expect } from "@playwright/test";

test("user can register, login, and add a book", async ({ page }) => {
  const email = `e2e+${Date.now()}@example.com`;
  const password = "test12345";

  // Register
await page.goto("http://localhost:3000/register");

await page.locator('[name="name"]').fill("Playwright User");
await page.locator('[name="email"]').fill(email);
await page.locator('[name="password"]').fill(password);

const registerButton = page.getByRole("button", {
  name: "Create account",
});

await expect(registerButton).toBeVisible();
await expect(registerButton).toBeEnabled();

await registerButton.click();

await expect(page).toHaveURL(/login/);

  // Login
  await page.goto("http://localhost:3000/login");

  await page.locator('[name="email"]').fill(email);
  await page.locator('[name="password"]').fill(password);

  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("**/dashboard");

  // Open Add Book page
  await page.goto("http://localhost:3000/admin/books/new");
  
  await page.waitForLoadState("networkidle");
  await expect(page.locator('[name="title"]')).toBeVisible();
  
  await page.locator('[name="title"]').fill("Atomic Habits");
  await page.locator('[name="author"]').fill("James Clear");
  await page.locator('[name="totalPages"]').fill("320");

  await page.locator('[name="readingStatus"]').selectOption("UNREAD");

  await page.getByRole("button", { name: "Add book" }).click();

  // Verify
  await expect(page.getByText("Atomic Habits")).toBeVisible();
});