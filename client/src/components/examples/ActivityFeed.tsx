import ActivityFeed from "../ActivityFeed";

export default function ActivityFeedExample() {
  const activities = [
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
  ];

  return (
    <div className="p-4 max-w-md">
      <ActivityFeed activities={activities} />
    </div>
  );
}
