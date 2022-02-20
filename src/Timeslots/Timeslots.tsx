import { Fragment, useState } from "react";
import { DayOfWeek, Timeslot } from "../components";
import { useTimeslots } from "./useTimeslots";

export function Timeslots() {
  const { isLoading, data } = useTimeslots();
  const [reservations, setReservations] = useState(
    {} as Record<string, { start_time: Date; end_time: Date } | null>
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${data?.length ?? 1}, 1fr)`,
        gridTemplateRows: "auto 1fr",
        height: "100vh",
      }}
    >
      {isLoading ? <div>Loading slots...</div> : null}
      {data?.map(({ id, name }) => (
        <div key={id}>
          <h2>{name}</h2>
          <div data-testid="reservation" data-company={id}>
            Reservation:{" "}
            {reservations[id] ? (
              <Timeslot
                startDate={reservations[id]!.start_time}
                endDate={reservations[id]!.end_time}
              />
            ) : (
              "None"
            )}
          </div>
        </div>
      ))}
      <div
        style={{
          overflow: "auto",
          gridColumn: "span 3",
          display: "grid",
          gridTemplateColumns: `repeat(${data?.length ?? 1}, 1fr)`,
        }}
      >
        {data?.map(({ id, time_slots_by_day }) => (
          <Fragment key={id}>
            <div data-testid="timeslots" data-company={id}>
              {Object.entries(time_slots_by_day).map(([day, time_slots]) => (
                <div key={day}>
                  <h3 style={{ textAlign: "center" }}>
                    <DayOfWeek date={time_slots[0].start_time} />
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {time_slots.map(({ start_time, end_time }) => {
                      const [overlapCompanyId, overlapTimeslot] =
                        Object.entries(reservations).find(
                          ([, reservation]) =>
                            reservation &&
                            ((start_time >= reservation.start_time &&
                              start_time < reservation.end_time) ||
                              (end_time > reservation.start_time &&
                                end_time <= reservation.end_time))
                        ) ?? [null, null];

                      const overlapIsThisCompany = overlapCompanyId === `${id}`;
                      const overlapIsThisTimeslot =
                        overlapTimeslot?.start_time.getTime() ===
                          start_time.getTime() &&
                        overlapTimeslot?.end_time.getTime() ===
                          end_time.getTime();

                      return (
                        <button
                          key={
                            start_time.toISOString() + end_time.toISOString()
                          }
                          onClick={() => {
                            setReservations({
                              ...reservations,
                              [id]: overlapIsThisTimeslot
                                ? null
                                : { start_time, end_time },
                            });
                          }}
                          disabled={
                            overlapCompanyId ? !overlapIsThisCompany : false
                          }
                          style={{
                            display: "block",
                            borderColor:
                              overlapIsThisCompany && overlapIsThisTimeslot
                                ? "red"
                                : undefined,
                            padding: 5,
                            margin: 5,
                          }}
                          data-testid="timeslot"
                        >
                          <Timeslot startDate={start_time} endDate={end_time} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
