import { QueryClient, QueryClientProvider } from "react-query";
import { Timeslots } from "./Timeslots";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Timeslots />
    </QueryClientProvider>
  );
}
