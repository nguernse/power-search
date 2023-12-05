import EmptyShortcuts from "./EmptyShortcuts";

describe("EmptyShortcuts", () => {
  beforeEach(() => {
    cy.mount(<EmptyShortcuts />);
  });

  it("Should render", () => {
    cy.get("[data-testid='empty-shortcuts']").should("exist");
  });

  it("Should have title", () => {
    cy.get("[data-testid='empty-shortcuts'] h2").should("exist");
  });

  it("Should have description", () => {
    cy.get("[data-testid='empty-shortcuts'] p").should("exist");
  });

  it("Should have predefined shortcuts button", () => {
    cy.get("button[data-testid='predefined-shortcuts-button']").should("exist");
  });

  it("Should have add shortcut dialog", () => {
    cy.get("[data-testid='add-shortcut-dialog']").should("exist");
  });
});
