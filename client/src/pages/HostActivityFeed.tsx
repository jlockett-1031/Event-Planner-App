import { ArrowLeft, Mail, UtensilsCrossed, CheckCircle2, Shirt, MapPin, Music } from "lucide-react";

interface Activity {
  id: string;
  icon: "mail" | "utensils" | "check" | "shirt" | "map" | "music";
  text: string;
  time: string;
}

interface HostActivityFeedProps {
  onBack?: () => void;
}

export default function HostActivityFeed({ onBack }: HostActivityFeedProps) {
  // Mock activity data
  const activities: Activity[] = [
    {
      id: "1",
      icon: "mail",
      text: "You sent invites to 50 guests",
      time: "2 hours ago",
    },
    {
      id: "2",
      icon: "utensils",
      text: 'James added "Last-Minute Needs" section to potluck',
      time: "4 hours ago",
    },
    {
      id: "3",
      icon: "check",
      text: "12 new RSVPs received",
      time: "5 hours ago",
    },
    {
      id: "4",
      icon: "shirt",
      text: 'Maria updated the dress code to "Summer Casual"',
      time: "Yesterday",
    },
    {
      id: "5",
      icon: "map",
      text: "You added parking instructions",
      time: "Yesterday",
    },
    {
      id: "6",
      icon: "music",
      text: "James created AI playlist (23 songs)",
      time: "2 days ago",
    },
  ];

  const getIcon = (iconType: Activity["icon"]) => {
    const iconClass = "w-5 h-5";
    switch (iconType) {
      case "mail":
        return <Mail className={iconClass} />;
      case "utensils":
        return <UtensilsCrossed className={iconClass} />;
      case "check":
        return <CheckCircle2 className={iconClass} />;
      case "shirt":
        return <Shirt className={iconClass} />;
      case "map":
        return <MapPin className={iconClass} />;
      case "music":
        return <Music className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Host Activity Feed</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Activity List */}
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 bg-card rounded-lg"
              data-testid={`activity-${activity.id}`}
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                {getIcon(activity.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base text-card-foreground">{activity.text}</p>
                <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
