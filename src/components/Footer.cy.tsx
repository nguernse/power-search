import Footer from "./Footer";

describe("Footer", () => {
  it("should exist", () => {
    cy.mount(<Footer />);

    cy.get("[data-testid='footer']").should("exist");
  });
});
