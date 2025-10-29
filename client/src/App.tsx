import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import EventForm from "@/components/EventForm";
import EventDetails from "@/components/EventDetails";
import NotFound from "@/pages/not-found";

function Router() {
  const [currentView, setCurrentView] = useState<"dashboard" | "create" | "details">("dashboard");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // TODO: Remove mock data - replace with real event details from backend
  const mockEventDetails = {
    id: "1",
    name: "Sarah's Graduation Party",
    type: "graduation",
    date: "December 15, 2025",
    time: "4:00 PM",
    location: "123 Main St, Apartment 4B",
    description:
      "Join us to celebrate Sarah's graduation! There will be food, drinks, and great company. Please RSVP by December 1st.",
    maxAttendees: 50,
    isHost: true,
    rsvpStats: {
      yes: 12,
      maybe: 5,
      no: 3,
    },
    guests: [
      { id: "1", name: "Alice Johnson", rsvp: "yes" as const },
      { id: "2", name: "Bob Smith", rsvp: "maybe" as const },
      { id: "3", name: "Carol White", rsvp: "yes" as const },
      { id: "4", name: "David Brown", rsvp: "pending" as const },
      { id: "5", name: "Eve Davis", rsvp: "no" as const },
    ],
    potluckItems: [
      { id: "1", item: "Appetizers", claimedBy: "John Doe" },
      { id: "2", item: "Main Dish" },
      { id: "3", item: "Dessert", claimedBy: "Jane Smith" },
      { id: "4", item: "Drinks" },
    ],
    activities: [
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
    ],
  };

  return (
    <Switch>
      <Route path="/">
        {currentView === "dashboard" && (
          <Dashboard
            onCreateEvent={() => setCurrentView("create")}
            onEventClick={(eventId) => {
              setSelectedEventId(eventId);
              setCurrentView("details");
            }}
          />
        )}
        {currentView === "create" && (
          <div className="min-h-screen bg-background">
            <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-8 px-6">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center">Create Event</h1>
              </div>
            </div>
            <EventForm
              onBack={() => setCurrentView("dashboard")}
              onSubmit={(eventData) => {
                console.log("Event created:", eventData);
                setCurrentView("dashboard");
              }}
            />
          </div>
        )}
        {currentView === "details" && (
          <div className="min-h-screen bg-background">
            <EventDetails
              event={mockEventDetails}
              onBack={() => setCurrentView("dashboard")}
              onEdit={() => console.log("Edit event")}
              onDelete={() => {
                console.log("Delete event");
                setCurrentView("dashboard");
              }}
              onRSVP={(response) => console.log("RSVP:", response)}
            />
          </div>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
