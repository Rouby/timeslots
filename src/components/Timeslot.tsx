import React from "react";

export function Timeslot({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  const formatter = new Intl.DateTimeFormat(window.navigator.language, {
    hour: "numeric",
    minute: "numeric",
  });

  return <>{formatter.formatRange(startDate, endDate)}</>;
}
