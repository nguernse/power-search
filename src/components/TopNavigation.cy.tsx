import TopNavigation from "./TopNavigation";

describe("TopNavigation", () => {
  beforeEach(() => {
    cy.mount(<TopNavigation />);
  });

  it("Should render", () => {
    cy.get("[data-testid='top-navigation']").should("exist");
  });

  it("Should have link to home page", () => {
    cy.get("[data-testid='top-navigation'] a[href='/']").should("exist");
  });
});
