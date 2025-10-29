import EventCard from "../EventCard";

export default function EventCardExample() {
  const event = {
    id: "1",
    name: "Sarah's Graduation Party",
    date: "December 15, 2025",
    time: "4:00 PM",
    location: "123 Main St, Apartment 4B",
    role: "primary-host" as const,
  };

  return (
    <div className="p-4 max-w-md">
      <EventCard event={event} onClick={() => console.log("Event clicked")} />
    </div>
  );
}
