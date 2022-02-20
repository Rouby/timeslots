import { mount } from "@cypress/react";
import { Timeslot } from "../Timeslot";

describe("The timeslot for", () => {
  it("an hour-slot on the same day and same AM/PM should just the hours", () => {
    mount(
      <Timeslot
        startDate={new Date(2022, 2, 20, 10, 0, 0)}
        endDate={new Date(2022, 2, 20, 11, 0, 0)}
      />
    );

    cy.get("#__cy_root").should(
      "contain",
      new Intl.DateTimeFormat([], {
        hour: "numeric",
        minute: "numeric",
      }).formatRange(
        new Date(2022, 2, 20, 10, 0, 0),
        new Date(2022, 2, 20, 11, 0, 0)
      )
    );
  });

  it("some invalid dates should be N/A", () => {
    mount(
      <Timeslot
        startDate={new Date("not a date")}
        endDate={new Date(2022, 2, 20, 14, 30, 0)}
      />
    );

    cy.get("#__cy_root").should("contain", "N/A");
  });
});
