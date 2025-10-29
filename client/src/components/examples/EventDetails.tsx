import EventDetails from "../EventDetails";

export default function EventDetailsExample() {
  const event = {
    id: "1",
    name: "Sarah's Graduation Party",
    type: "graduation",
    date: "December 15, 2025",
    time: "4:00 PM",
    location: "123 Main St, Apartment 4B",
    description:
      "Join us to celebrate Sarah's graduation! There will be food, drinks, and great company. Please RSVP by December 1st.",
    maxAttendees: 50,
    isHost: true,
    rsvpStats: {
      yes: 12,
      maybe: 5,
      no: 3,
    },
    guests: [
      { id: "1", name: "Alice Johnson", rsvp: "yes" as const },
      { id: "2", name: "Bob Smith", rsvp: "maybe" as const },
      { id: "3", name: "Carol White", rsvp: "yes" as const },
      { id: "4", name: "David Brown", rsvp: "pending" as const },
      { id: "5", name: "Eve Davis", rsvp: "no" as const },
    ],
    potluckItems: [
      { id: "1", item: "Appetizers", claimedBy: "John Doe" },
      { id: "2", item: "Main Dish" },
      { id: "3", item: "Dessert", claimedBy: "Jane Smith" },
      { id: "4", item: "Drinks" },
    ],
    activities: [
      {
        id: "1",
        type: "rsvp" as const,
        text: "Alice Johnson RSVP'd Yes",
        time: "2 hours ago",
      },
      {
        id: "2",
        type: "potluck" as const,
        text: "Bob Smith claimed Appetizers",
        time: "5 hours ago",
      },
      {
        id: "3",
        type: "invite" as const,
        text: "You invited Carol White",
        time: "1 day ago",
      },
    ],
  };

  return (
    <EventDetails
      event={event}
      onBack={() => console.log("Back clicked")}
      onEdit={() => console.log("Edit clicked")}
      onDelete={() => console.log("Delete clicked")}
      onRSVP={(response) => console.log("RSVP:", response)}
    />
  );
}
