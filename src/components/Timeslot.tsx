export function Timeslot({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  const formatter = new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "numeric",
  });

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return <>N/A</>;
  }

  return <>{formatter.formatRange(startDate, endDate)}</>;
}
