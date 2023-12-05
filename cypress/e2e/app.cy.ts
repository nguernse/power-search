/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("should navigate to the shortcuts page", () => {
    cy.get('a[href*="shortcuts"]').click();

    cy.url().should("include", "/shortcuts");
  });

  it("should navigate to the settings page", () => {
    cy.get('button[data-testid="search-menu-button"]').click();
    cy.get('a[href*="settings"]').click();

    cy.url().should("include", "/settings");
  });

  it("should navigate to the history page", () => {
    cy.get('button[data-testid="search-menu-button"]').click();
    cy.get('a[href*="history"]').click();

    cy.url().should("include", "/history");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
