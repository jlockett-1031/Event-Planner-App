import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import EventForm from "@/components/EventForm";
import EventDetailsHost from "@/pages/EventDetailsHost";
import EventDetailsPotluck from "@/pages/EventDetailsPotluck";
import EventDetailsGuest from "@/pages/EventDetailsGuest";
import HostActivityFeed from "@/pages/HostActivityFeed";
import GuestList from "@/pages/GuestList";
import DrinkCalculator from "@/pages/DrinkCalculator";
import GiftRegistry from "@/pages/GiftRegistry";
import MusicDashboard from "@/pages/MusicDashboard";
import PhotoAlbum from "@/pages/PhotoAlbum";
import LocationDetails from "@/pages/LocationDetails";
import ManageHostTeam from "@/pages/ManageHostTeam";
import EventCalendar from "@/pages/EventCalendar";
import PastEventDetailsGuest from "@/pages/PastEventDetailsGuest";
import EventSettings from "@/pages/EventSettings";
import CommunicationTools from "@/pages/CommunicationTools";
import EventManagement from "@/pages/EventManagement";
import AnalyticsReports from "@/pages/AnalyticsReports";
import AdvancedFeatures from "@/pages/AdvancedFeatures";
import NotFound from "@/pages/not-found";

type ViewMode = "hosting" | "attending" | "past";

function Router() {
  const [currentView, setCurrentView] = useState<"dashboard" | "create" | "details" | "details-potluck" | "details-guest" | "host-activity" | "guest-list" | "drink-calculator" | "gift-registry" | "music-dashboard" | "photo-album" | "location-details" | "manage-host-team" | "calendar" | "past-event-guest" | "event-settings" | "communication-tools" | "event-management" | "analytics-reports" | "advanced-features">("dashboard");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [parentEventView, setParentEventView] = useState<"details" | "details-potluck">("details");
  const [dashboardViewMode, setDashboardViewMode] = useState<ViewMode>("hosting");

  return (
    <Switch>
      <Route path="/">
        {currentView === "dashboard" && (
          <Dashboard
            initialViewMode={dashboardViewMode}
            onViewModeChange={setDashboardViewMode}
            onCreateEvent={() => setCurrentView("create")}
            onViewCalendar={() => setCurrentView("calendar")}
            onEventClick={(eventId) => {
              setSelectedEventId(eventId);
              // Route to past event guest view for past events (IDs "7" and "8")
              if (eventId === "7" || eventId === "8") {
                setCurrentView("past-event-guest");
              }
              // Route to guest view for attending events (IDs "3", "4", and "6")
              else if (eventId === "3" || eventId === "4" || eventId === "6") {
                setCurrentView("details-guest");
              }
              // Route to potluck page for Holiday Potluck event (ID "2")
              else if (eventId === "2") {
                setParentEventView("details-potluck");
                setCurrentView("details-potluck");
              }
              // Route to regular details page for other hosting events
              else {
                setParentEventView("details");
                setCurrentView("details");
              }
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
            onPhotoAlbum={() => setCurrentView("photo-album")}
            onLocationDetails={() => setCurrentView("location-details")}
            onManageHostTeam={() => setCurrentView("manage-host-team")}
            onEventSettings={() => setCurrentView("event-settings")}
            onCommunicationTools={() => setCurrentView("communication-tools")}
            onEventManagement={() => setCurrentView("event-management")}
            onAnalyticsReports={() => setCurrentView("analytics-reports")}
            onAdvancedFeatures={() => setCurrentView("advanced-features")}
          />
        )}
        {currentView === "details-potluck" && (
          <EventDetailsPotluck
            onBack={() => setCurrentView("dashboard")}
            onManageGuests={() => setCurrentView("guest-list")}
            onManagePotluck={() => console.log("Manage Potluck")}
            onDrinkCalculator={() => setCurrentView("drink-calculator")}
            onGiftRegistry={() => setCurrentView("gift-registry")}
            onMusicPlaylist={() => setCurrentView("music-dashboard")}
            onHostActivity={() => setCurrentView("host-activity")}
            onPhotoAlbum={() => setCurrentView("photo-album")}
            onLocationDetails={() => setCurrentView("location-details")}
            onManageHostTeam={() => setCurrentView("manage-host-team")}
            onEventSettings={() => setCurrentView("event-settings")}
            onCommunicationTools={() => setCurrentView("communication-tools")}
            onEventManagement={() => setCurrentView("event-management")}
            onAnalyticsReports={() => setCurrentView("analytics-reports")}
            onAdvancedFeatures={() => setCurrentView("advanced-features")}
          />
        )}
        {currentView === "host-activity" && (
          <HostActivityFeed onBack={() => setCurrentView(parentEventView)} />
        )}
        {currentView === "guest-list" && (
          <GuestList onBack={() => setCurrentView(parentEventView)} />
        )}
        {currentView === "drink-calculator" && (
          <DrinkCalculator 
            onBack={() => setCurrentView(parentEventView)} 
            onCalculate={() => console.log("Calculate")}
            onAdvancedOptions={() => console.log("Advanced Options")}
          />
        )}
        {currentView === "gift-registry" && (
          <GiftRegistry onBack={() => setCurrentView(parentEventView)} />
        )}
        {currentView === "music-dashboard" && (
          <MusicDashboard onBack={() => setCurrentView(parentEventView)} />
        )}
        {currentView === "photo-album" && (
          <PhotoAlbum onBack={() => setCurrentView(parentEventView)} />
        )}
        {currentView === "location-details" && (
          <LocationDetails onBack={() => setCurrentView(parentEventView)} />
        )}
        {currentView === "manage-host-team" && (
          <ManageHostTeam onBack={() => setCurrentView(parentEventView)} />
        )}
        {currentView === "calendar" && (
          <EventCalendar onBack={() => setCurrentView("dashboard")} />
        )}
        {currentView === "details-guest" && selectedEventId && (
          <EventDetailsGuest
            eventId={selectedEventId}
            onBack={() => setCurrentView("dashboard")}
          />
        )}
        {currentView === "past-event-guest" && selectedEventId && (
          <PastEventDetailsGuest
            eventId={selectedEventId}
            onBack={() => setCurrentView("dashboard")}
          />
        )}
        {currentView === "event-settings" && (
          <EventSettings onBack={() => setCurrentView(parentEventView)} />
        )}
        {currentView === "communication-tools" && (
          <CommunicationTools onBack={() => setCurrentView(parentEventView)} />
        )}
        {currentView === "event-management" && (
          <EventManagement onBack={() => setCurrentView(parentEventView)} />
        )}
        {currentView === "analytics-reports" && (
          <AnalyticsReports onBack={() => setCurrentView(parentEventView)} />
        )}
        {currentView === "advanced-features" && (
          <AdvancedFeatures onBack={() => setCurrentView(parentEventView)} />
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
