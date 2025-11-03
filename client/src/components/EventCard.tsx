import { Calendar, MapPin, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  role: "primary-host" | "co-host" | "attending";
  hasTimeConflict?: boolean;
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

  const handleViewCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement calendar view
    alert("Calendar view will be implemented");
  };

  return (
    <div className="space-y-3">
      <div
        className={`bg-card rounded-xl p-6 border-2 transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${
          event.hasTimeConflict 
            ? "border-amber-400 dark:border-amber-600" 
            : "border-transparent hover:border-primary"
        }`}
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
          {event.hasTimeConflict && (
            <p className="text-sm text-amber-700 dark:text-amber-500 flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4" />
              Time conflict with another event!
            </p>
          )}
        </div>
        <Badge className={getBadgeClass()}>{getBadgeText()}</Badge>
      </div>
      
      {event.hasTimeConflict && (
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleViewCalendar}
          data-testid={`button-view-calendar-${event.id}`}
        >
          View Calendar
        </Button>
      )}
    </div>
  );
}
