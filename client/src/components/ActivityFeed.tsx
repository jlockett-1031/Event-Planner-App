import { UserCheck, UtensilsCrossed, UserPlus } from "lucide-react";

export interface Activity {
  id: string;
  type: "rsvp" | "potluck" | "invite";
  text: string;
  time: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "rsvp":
        return <UserCheck className="w-5 h-5" />;
      case "potluck":
        return <UtensilsCrossed className="w-5 h-5" />;
      case "invite":
        return <UserPlus className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-3 p-3 bg-card rounded-lg"
          data-testid={`activity-${activity.id}`}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            {getIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-card-foreground">{activity.text}</p>
            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
