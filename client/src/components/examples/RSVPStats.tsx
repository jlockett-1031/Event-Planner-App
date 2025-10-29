import RSVPStats from "../RSVPStats";

export default function RSVPStatsExample() {
  return (
    <div className="p-4 max-w-md">
      <RSVPStats yesCount={12} maybeCount={5} noCount={3} />
    </div>
  );
}
