import EventDetailsHost from "../EventDetailsHost";

export default function EventDetailsHostExample() {
  return (
    <EventDetailsHost
      onBack={() => console.log("Back clicked")}
      onManageGuests={() => console.log("Manage Guests clicked")}
      onManagePotluck={() => console.log("Manage Potluck clicked")}
      onDrinkCalculator={() => console.log("Drink Calculator clicked")}
      onGiftRegistry={() => console.log("Gift Registry clicked")}
      onMusicPlaylist={() => console.log("Music Playlist clicked")}
      onHostActivity={() => console.log("Host Activity clicked")}
    />
  );
}
