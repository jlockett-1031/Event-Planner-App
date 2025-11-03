import { useState } from "react";
import { ArrowLeft, Users, UtensilsCrossed, Wine, Gift, Music, Camera, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface EventDetailsHostProps {
  onBack?: () => void;
  onManageGuests?: () => void;
  onManagePotluck?: () => void;
  onDrinkCalculator?: () => void;
  onGiftRegistry?: () => void;
  onMusicPlaylist?: () => void;
  onHostActivity?: () => void;
}

export default function EventDetailsHost({
  onBack,
  onManageGuests,
  onManagePotluck,
  onDrinkCalculator,
  onGiftRegistry,
  onMusicPlaylist,
  onHostActivity,
}: EventDetailsHostProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Sarah's Graduation Party</h1>
          <p className="text-center text-white/90 text-sm">December 15, 2025 • 4:00 PM</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </button>

        {/* RSVP Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center" data-testid="rsvp-yes">
            <div className="text-4xl font-bold text-primary">35</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
              Yes
            </div>
          </div>
          <div className="text-center" data-testid="rsvp-maybe">
            <div className="text-4xl font-bold text-primary">5</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
              Maybe
            </div>
          </div>
          <div className="text-center" data-testid="rsvp-no">
            <div className="text-4xl font-bold text-primary">10</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
              No
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" data-testid="tab-overview">
              Overview
            </TabsTrigger>
            <TabsTrigger value="guests" data-testid="tab-guests">
              Guests
            </TabsTrigger>
            <TabsTrigger value="potluck" data-testid="tab-potluck">
              Menu
            </TabsTrigger>
            <TabsTrigger value="more" data-testid="tab-more">
              More
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Host Team */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Host Team</h3>
              <div className="bg-card rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div>
                    <div className="font-semibold">You</div>
                    <Badge className="mt-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                      📣 Comm Lead
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div>
                    <div className="font-semibold">Maria Garcia</div>
                    <div className="text-sm text-muted-foreground">Co-Host</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-semibold">James Smith</div>
                    <div className="text-sm text-muted-foreground">Co-Host</div>
                  </div>
                </div>
              </div>
              <Button
                variant="secondary"
                className="w-full mt-3"
                onClick={onHostActivity}
                data-testid="button-host-activity"
              >
                View Host Activity Feed
              </Button>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  data-testid="button-manage-menu"
                >
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  Manage Food Menu
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={onDrinkCalculator}
                  data-testid="button-drink-calculator"
                >
                  <Wine className="w-4 h-4 mr-2" />
                  Drink Calculator
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={onGiftRegistry}
                  data-testid="button-gift-registry"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Manage Gift Registry
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={onMusicPlaylist}
                  data-testid="button-music-playlist"
                >
                  <Music className="w-4 h-4 mr-2" />
                  Music Playlist
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  data-testid="button-photo-album"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Photo Album
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  data-testid="button-location-details"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Location & Details
                </Button>
              </div>
            </div>

            <Button className="w-full" size="lg" data-testid="button-send-invites">
              Send Invites to All
            </Button>
          </TabsContent>

          <TabsContent value="guests" className="mt-6">
            <div className="space-y-4">
              <Button
                variant="secondary"
                className="w-full justify-start"
                onClick={onManageGuests}
                data-testid="button-manage-guests"
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Guest List (50)
              </Button>
              <div className="bg-card rounded-xl p-6 text-center">
                <p className="text-muted-foreground">Click above to view and manage your guest list</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="potluck" className="mt-6">
            <div className="bg-card rounded-xl p-6 text-center">
              <p className="text-muted-foreground">Potluck management view</p>
              <Button className="mt-4" onClick={onManagePotluck}>
                Go to Potluck Management
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="more" className="mt-6">
            <div className="bg-card rounded-xl p-6 text-center">
              <p className="text-muted-foreground">Additional event settings</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
