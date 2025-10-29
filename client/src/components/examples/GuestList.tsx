import GuestList from "../GuestList";

export default function GuestListExample() {
  const guests = [
    { id: "1", name: "Alice Johnson", rsvp: "yes" as const },
    { id: "2", name: "Bob Smith", rsvp: "maybe" as const },
    { id: "3", name: "Carol White", rsvp: "yes" as const },
    { id: "4", name: "David Brown", rsvp: "pending" as const },
    { id: "5", name: "Eve Davis", rsvp: "no" as const },
  ];

  return (
    <div className="p-4 max-w-md bg-card rounded-xl">
      <GuestList guests={guests} />
    </div>
  );
}
