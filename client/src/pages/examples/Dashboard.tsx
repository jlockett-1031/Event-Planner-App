import Dashboard from "../Dashboard";

export default function DashboardExample() {
  return (
    <Dashboard
      onCreateEvent={() => console.log("Create event clicked")}
      onEventClick={(id) => console.log("Event clicked:", id)}
    />
  );
}
