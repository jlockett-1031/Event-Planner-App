import GuestList from "../GuestList";

export default function GuestListExample() {
  return <GuestList onBack={() => console.log("Back clicked")} />;
}
