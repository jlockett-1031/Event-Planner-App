import EventForm from "../EventForm";

export default function EventFormExample() {
  return (
    <EventForm
      onBack={() => console.log("Back clicked")}
      onSubmit={(data) => console.log("Event submitted:", data)}
    />
  );
}
