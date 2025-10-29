import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  role: "primary-host" | "co-host" | "attending";
}

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const getBadgeText = () => {
    switch (event.role) {
      case "primary-host":
        return "Primary Host";
      case "co-host":
        return "Co-Host";
      case "attending":
        return "Attending";
    }
  };

  const getBadgeClass = () => {
    switch (event.role) {
      case "primary-host":
        return "bg-amber-200 text-amber-900 hover:bg-amber-200/80";
      case "co-host":
        return "bg-blue-200 text-blue-900 hover:bg-blue-200/80";
      case "attending":
        return "bg-emerald-200 text-emerald-900 hover:bg-emerald-200/80";
    }
  };

  return (
    <div
      className="bg-card rounded-xl p-6 border-2 border-transparent hover:border-primary transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
      onClick={onClick}
      data-testid={`event-card-${event.id}`}
    >
      <h3 className="text-xl font-semibold text-card-foreground mb-3">
        {event.name}
      </h3>
      <div className="space-y-2 mb-4">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {event.date} • {event.time}
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {event.location}
        </p>
      </div>
      <Badge className={getBadgeClass()}>{getBadgeText()}</Badge>
    </div>
  );
}
