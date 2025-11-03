import { useState } from "react";
import EventHeader from "@/components/EventHeader";
import EventCard, { type Event } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type ViewMode = "hosting" | "attending" | "past";

// TODO: Remove mock data - replace with real data from backend
const mockHostingEvents: Event[] = [
  {
    id: "1",
    name: "Sarah's Graduation Party",
    date: "December 15, 2025",
    time: "4:00 PM",
    location: "123 Main St, Apartment 4B",
    role: "primary-host",
  },
  {
    id: "2",
    name: "Holiday Potluck",
    date: "December 23, 2025",
    time: "6:00 PM",
    location: "Maria's House",
    role: "co-host",
  },
];

const mockAttendingEvents: Event[] = [
  {
    id: "3",
    name: "New Year's Eve Bash",
    date: "December 31, 2025",
    time: "9:00 PM",
    location: "Downtown Event Center",
    role: "attending",
    hasTimeConflict: true,
  },
  {
    id: "4",
    name: "Mike's Birthday Party",
    date: "January 5, 2026",
    time: "3:00 PM",
    location: "Central Park Pavilion",
    role: "attending",
  },
  {
    id: "6",
    name: "New Year's Countdown Party",
    date: "December 31, 2025",
    time: "8:00 PM",
    location: "Rooftop Lounge",
    role: "attending",
    hasTimeConflict: true,
  },
];

const mockPastEvents: Event[] = [
  {
    id: "5",
    name: "Thanksgiving Dinner",
    date: "November 28, 2024",
    time: "5:00 PM",
    location: "123 Oak Street",
    role: "primary-host",
  },
];

interface DashboardProps {
  onCreateEvent?: () => void;
  onEventClick?: (eventId: string) => void;
}

export default function Dashboard({ onCreateEvent, onEventClick }: DashboardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("hosting");

  const getEvents = () => {
    switch (viewMode) {
      case "hosting":
        return mockHostingEvents;
      case "attending":
        return mockAttendingEvents;
      case "past":
        return mockPastEvents;
    }
  };

  const events = getEvents();

  return (
    <div className="min-h-screen bg-background">
      <EventHeader activeMode={viewMode} onModeChange={setViewMode} />
      
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">
          {viewMode === "hosting" && "Your Events"}
          {viewMode === "attending" && "Attending"}
          {viewMode === "past" && "Past Events"}
        </h2>

        <div className="space-y-4 mb-6">
          {events.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl">
              <p className="text-muted-foreground mb-4">No events found</p>
              {viewMode === "hosting" && (
                <Button onClick={onCreateEvent} data-testid="button-create-first-event">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Event
                </Button>
              )}
            </div>
          ) : (
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onEventClick?.(event.id)}
              />
            ))
          )}
        </div>

        {viewMode === "hosting" && events.length > 0 && (
          <Button
            onClick={onCreateEvent}
            className="w-full"
            size="lg"
            data-testid="button-create-event"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Event
          </Button>
        )}
      </div>
    </div>
  );
}
