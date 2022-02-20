import { mount } from "@cypress/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Timeslots } from "../Timeslots";

describe("The timeslots", () => {
  beforeEach(() => {
    cy.intercept("/time_slots", [
      {
        id: 1,
        name: "Company 1",
        time_slots: [
          { start_time: "2020-01-01T11:00", end_time: "2020-01-01T12:00" },
          { start_time: "2020-01-01T11:30", end_time: "2020-01-01T12:30" },
          { start_time: "2020-01-01T14:00", end_time: "2020-01-01T16:00" },
        ],
      },
      {
        id: 2,
        name: "Company 2",
        time_slots: [
          { start_time: "2020-01-01T11:00", end_time: "2020-01-01T12:00" },
          { start_time: "2020-01-01T11:30", end_time: "2020-01-01T12:30" },
          { start_time: "2020-01-01T14:00", end_time: "2020-01-01T16:00" },
        ],
      },
    ]);
  });

  it("should allow a user to select & de-select a timeslot", () => {
    mount(
      <QueryClientProvider client={new QueryClient()}>
        <Timeslots />
      </QueryClientProvider>
    );

    cy.get('[data-testid="timeslots"][data-company="1"]')
      .contains('[data-testid="timeslot"]', "11:00–12:00")
      .as("timeslot")
      .click();

    cy.get('[data-testid="reservation"][data-company="1"]').should(
      "contain",
      "11:00–12:00"
    );

    cy.get("@timeslot").click();

    cy.get('[data-testid="reservation"][data-company="1"]').should(
      "contain",
      "None"
    );
  });

  it("should allow a user to switch to a different timeslot overlapping with the select by the same company", () => {
    mount(
      <QueryClientProvider client={new QueryClient()}>
        <Timeslots />
      </QueryClientProvider>
    );

    cy.get('[data-testid="timeslots"][data-company="1"]')
      .contains('[data-testid="timeslot"]', "11:00–12:00")
      .click();

    cy.get('[data-testid="reservation"][data-company="1"]').should(
      "contain",
      "11:00–12:00"
    );

    cy.get('[data-testid="timeslots"][data-company="1"]')
      .contains('[data-testid="timeslot"]', "11:30–12:30")
      .click();

    cy.get('[data-testid="reservation"][data-company="1"]').should(
      "contain",
      "11:30–12:30"
    );
  });

  it("should block an exact timeslot from a differnt company on selection of said slot", () => {
    mount(
      <QueryClientProvider client={new QueryClient()}>
        <Timeslots />
      </QueryClientProvider>
    );

    cy.get('[data-testid="timeslots"][data-company="1"]')
      .contains('[data-testid="timeslot"]', "11:00–12:00")
      .click();

    cy.get('[data-testid="timeslots"][data-company="2"]')
      .contains('[data-testid="timeslot"]', "11:00–12:00")
      .should("be.disabled");
    cy.get('[data-testid="timeslots"][data-company="2"]')
      .contains('[data-testid="timeslot"]', "11:30–12:30")
      .should("be.disabled");
    cy.get('[data-testid="timeslots"][data-company="2"]')
      .contains('[data-testid="timeslot"]', "14:00–16:00")
      .should("not.be.disabled");
  });
});
