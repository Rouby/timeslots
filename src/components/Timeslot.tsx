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
    ...((window as any).Cypress && { hour12: false }),
  });

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return <>N/A</>;
  }

  return <>{formatter.formatRange(startDate, endDate)}</>;
}
