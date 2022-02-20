import { useQuery } from "react-query";

export function useTimeslots() {
  return useQuery("time_slots", async () => {
    const response = await fetch("/time_slots");
    const data: CompanyInfo[] = await response.json();

    return data.map((company) => ({
      ...company,
      time_slots_by_day: company.time_slots
        .map((time_slot) => ({
          ...time_slot,
          start_time: new Date(time_slot.start_time),
          end_time: new Date(time_slot.end_time),
        }))
        .reduce((acc, curr) => {
          const day = curr.start_time.getDay();
          if (!acc[day]) {
            acc[day] = [];
          }
          acc[day].push(curr);
          acc[day].sort(
            (a, b) => a.start_time.getTime() - b.start_time.getTime()
          );
          return acc;
        }, {} as Record<number, { start_time: Date; end_time: Date }[]>),
    }));
  });
}

type CompanyInfo = {
  id: number;
  name: string;
  type: string;
  time_slots: Timeslot[];
};

type Timeslot = {
  start_time: string;
  end_time: string;
};
