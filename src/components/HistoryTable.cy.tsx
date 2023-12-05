import { SearchItem } from "@/types";
import HistoryTable from "./HistoryTable";
import SearchProvider from "@/lib/context/SearchProvider";

const historyItems: SearchItem[] = [
  {
    query: "test",
    url: "https://test.com",
  },
  {
    query: "test2",
    url: "https://test2.com",
  },
];

describe("HistoryTable", () => {
  context("Default state", () => {
    beforeEach(() => {
      cy.mount(
        <SearchProvider>
          <HistoryTable history={[]} />
        </SearchProvider>
      );
    });

    it("Should render", () => {
      cy.get("[data-testid='history-table']").should("exist");
    });

    it("Should show empty message", () => {
      cy.get("[data-testid='empty-row']").should("exist");
    });
  });

  context("With history state", () => {
    beforeEach(() => {
      cy.mount(
        <SearchProvider>
          <HistoryTable history={historyItems} />
        </SearchProvider>
      );
    });

    it("Should render", () => {
      cy.get("[data-testid='history-table']").should("exist");
    });

    it("Should not show empty message", () => {
      cy.get("[data-testid='empty-row']").should("not.exist");
    });

    it(`Should have ${historyItems.length} rows`, () => {
      cy.get("[data-testid='history-table'] tbody tr").should(
        "have.length",
        historyItems.length
      );
    });
  });
});
