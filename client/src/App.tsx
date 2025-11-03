import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import EventForm from "@/components/EventForm";
import EventDetailsHost from "@/pages/EventDetailsHost";
import HostActivityFeed from "@/pages/HostActivityFeed";
import GuestList from "@/pages/GuestList";
import DrinkCalculator from "@/pages/DrinkCalculator";
import GiftRegistry from "@/pages/GiftRegistry";
import MusicDashboard from "@/pages/MusicDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  const [currentView, setCurrentView] = useState<"dashboard" | "create" | "details" | "host-activity" | "guest-list" | "drink-calculator" | "gift-registry" | "music-dashboard">("dashboard");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

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
          <EventDetailsHost
            onBack={() => setCurrentView("dashboard")}
            onManageGuests={() => setCurrentView("guest-list")}
            onManagePotluck={() => console.log("Manage Potluck")}
            onDrinkCalculator={() => setCurrentView("drink-calculator")}
            onGiftRegistry={() => setCurrentView("gift-registry")}
            onMusicPlaylist={() => setCurrentView("music-dashboard")}
            onHostActivity={() => setCurrentView("host-activity")}
          />
        )}
        {currentView === "host-activity" && (
          <HostActivityFeed onBack={() => setCurrentView("details")} />
        )}
        {currentView === "guest-list" && (
          <GuestList onBack={() => setCurrentView("details")} />
        )}
        {currentView === "drink-calculator" && (
          <DrinkCalculator 
            onBack={() => setCurrentView("details")} 
            onCalculate={() => console.log("Calculate")}
            onAdvancedOptions={() => console.log("Advanced Options")}
          />
        )}
        {currentView === "gift-registry" && (
          <GiftRegistry onBack={() => setCurrentView("details")} />
        )}
        {currentView === "music-dashboard" && (
          <MusicDashboard onBack={() => setCurrentView("details")} />
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
