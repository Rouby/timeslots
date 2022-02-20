export function DayOfWeek({ date }: { date: Date }) {
  const formatter = new Intl.DateTimeFormat(window.navigator.language, {
    weekday: "short",
  });

  if (isNaN(date.getTime())) {
    return <>N/A</>;
  }

  return (
    <>
      {formatter.formatToParts(date).find((part) => part.type === "weekday")
        ?.value ?? "N/A"}
    </>
  );
}
