import AddShortcutDialog from "./AddShortcutDialog";

describe("AddShortcutDialog", () => {
  context("Add mode", () => {
    beforeEach(() => {
      cy.mount(<AddShortcutDialog />);
    });

    it("Should render add shortcut dialog", () => {
      cy.get('[data-testid="dialog-content"]').should("not.exist");
      cy.get('button[data-testid="dialog-button"]').should("exist");
      cy.get('button[data-testid="dialog-button"]').should(
        "contain",
        "Add shortcut"
      );
    });

    it("Should open dialog", () => {
      cy.get('button[data-testid="dialog-button"]').click();
      cy.get('[data-testid="dialog-content"]').should("exist");
      cy.get('[data-testid="dialog-header"]').should("exist");
      cy.get('form[data-testid="shortcut-form"]').should("exist");
      cy.get('[data-testid="dialog-title"]').should("contain", "Add Shortcut");
      cy.get('button[data-testid="form-cancel-button"]').should("exist");
      cy.get('button[data-testid="form-submit-button"]').should("exist");
    });

    it("Should close dialog", () => {
      cy.get('button[data-testid="dialog-button"]').click();
      cy.get('[data-testid="dialog-content"]').should("exist");
      cy.get('button[data-testid="form-cancel-button"]').click();
      cy.get('[data-testid="dialog-content"]').should("not.exist");
    });

    it("Should submit and close", () => {
      cy.get('button[data-testid="dialog-button"]').click();
      cy.get('[data-testid="dialog-content"]').should("exist");
      cy.get('[data-testid="name-input"]').type("Test");
      cy.get('[data-testid="url-input"]').type("https://google.com/s?q=%Q");
      cy.get('button[data-testid="form-submit-button"]').click();
      cy.get('[data-testid="dialog-content"]').should("not.exist");
    });
  });

  context("Edit mode", () => {
    beforeEach(() => {
      cy.mount(
        <AddShortcutDialog
          shortcut={{
            id: "1",
            name: "Test",
            url: "https://google.com/s?q=%Q",
            isSelected: false,
          }}
        />
      );
    });

    it("Should render edit dialog", () => {
      cy.get('[data-testid="dialog-content"]').should("not.exist");
      cy.get('button[data-testid="dialog-button"]').should("exist");
      cy.get('button[data-testid="dialog-button"]').should(
        "contain",
        "Edit shortcut"
      );
    });

    it("Should open dialog", () => {
      cy.get('button[data-testid="dialog-button"]').click();
      cy.get('[data-testid="dialog-content"]').should("exist");
      cy.get('[data-testid="dialog-title"]').should("contain", "Edit Shortcut");
      cy.get('[data-testid="dialog-content"]').should("exist");
      cy.get('[data-testid="dialog-header"]').should("exist");
      cy.get('form[data-testid="shortcut-form"]').should("exist");
      cy.get('button[data-testid="form-cancel-button"]').should("exist");
      cy.get('button[data-testid="form-submit-button"]').should("exist");
    });

    it("Should close dialog", () => {
      cy.get('button[data-testid="dialog-button"]').click();
      cy.get('[data-testid="dialog-content"]').should("exist");
      cy.get('button[data-testid="form-cancel-button"]').click();
      cy.get('[data-testid="dialog-content"]').should("not.exist");
    });

    it("Should submit and close", () => {
      cy.get('button[data-testid="dialog-button"]').click();
      cy.get('[data-testid="dialog-content"]').should("exist");
      cy.get('[data-testid="name-input"]').type("Test");
      cy.get('[data-testid="url-input"]').type("https://google.com/s?q=%Q");
      cy.get('button[data-testid="form-submit-button"]').click();
      cy.get('[data-testid="dialog-content"]').should("not.exist");
    });
  });
});
