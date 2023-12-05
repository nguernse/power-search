describe("Selecting a shortcut", () => {
  it("Should update default shortcut", () => {
    cy.visit("http://localhost:3000/");
    cy.get('button[data-testid="search-menu-button"]').click();
    cy.get('[data-testid="choose-shortcut-trigger"]').click();
    cy.get('[data-testid="command-item"]:nth-of-type(2)')
      .first()
      .as("item2")
      .click();
    cy.get('button[data-testid="search-menu-button"]').click();
    cy.get('[data-testid="choose-shortcut-trigger"]').click();
    cy.get("@item2")
      .then((item) => {
        const itemText = item.text();
        cy.log("itemText", itemText);

        cy.get('[data-testid="selected-shortcut"]').then((selectedItem) => {
          const selectedText = selectedItem.text();
          expect(itemText).to.eq(selectedText);
        });

        cy.get('[data-testid="search-input"]').then((input) => {
          const placeholder = input.attr("placeholder");

          expect(placeholder.includes(itemText)).to.be.true;
        });
      })
      .click();
  });
});
