import { mount } from "@cypress/react";
import { DayOfWeek } from "../DayOfWeek";

describe("The day of week for", () => {
  it("2022/2/20 should be a sunday", () => {
    mount(<DayOfWeek date={new Date(2022, 2, 20)} />);

    cy.get("#__cy_root").should("contain", "Sun");
  });

  it("2021/2/20 should be a saturday", () => {
    mount(<DayOfWeek date={new Date(2021, 2, 20)} />);

    cy.get("#__cy_root").should("contain", "Sat");
  });

  it("2020/2/20 should be a friday", () => {
    mount(<DayOfWeek date={new Date(2020, 2, 20)} />);

    cy.get("#__cy_root").should("contain", "Fri");
  });

  it("2019/2/20 should be a wednesday", () => {
    mount(<DayOfWeek date={new Date(2019, 2, 20)} />);

    cy.get("#__cy_root").should("contain", "Wed");
  });

  it("2018/2/20 should be a tuesday", () => {
    mount(<DayOfWeek date={new Date(2018, 2, 20)} />);

    cy.get("#__cy_root").should("contain", "Tue");
  });

  it("2017/2/20 should be a monday", () => {
    mount(<DayOfWeek date={new Date(2017, 2, 20)} />);

    cy.get("#__cy_root").should("contain", "Mon");
  });

  it("2014/2/20 should be a thursday", () => {
    mount(<DayOfWeek date={new Date(2014, 2, 20)} />);

    cy.get("#__cy_root").should("contain", "Thu");
  });

  it("an invalid date should be N/A", () => {
    mount(<DayOfWeek date={new Date("not a date")} />);

    cy.get("#__cy_root").should("contain", "N/A");
  });
});
