import { useState } from "react";
import { ArrowLeft, UtensilsCrossed, Wine, Gift, Music, Camera, MapPin, Check, ChevronDown, ChevronUp, Info, ClipboardList, Megaphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface EventDetailsPotluckProps {
  onBack?: () => void;
  onManageGuests?: () => void;
  onManagePotluck?: () => void;
  onDrinkCalculator?: () => void;
  onGiftRegistry?: () => void;
  onMusicPlaylist?: () => void;
  onHostActivity?: () => void;
  onPhotoAlbum?: () => void;
  onLocationDetails?: () => void;
  onManageHostTeam?: () => void;
}

export default function EventDetailsPotluck({
  onBack,
  onManageGuests,
  onManagePotluck,
  onDrinkCalculator,
  onGiftRegistry,
  onMusicPlaylist,
  onHostActivity,
  onPhotoAlbum,
  onLocationDetails,
  onManageHostTeam,
}: EventDetailsPotluckProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Holiday Potluck</h1>
          <p className="text-center text-white/90 text-sm">December 20, 2025 • 6:00 PM</p>
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
            <div className="text-4xl font-bold text-primary">28</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
              Yes
            </div>
          </div>
          <div className="text-center" data-testid="rsvp-maybe">
            <div className="text-4xl font-bold text-primary">3</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
              Maybe
            </div>
          </div>
          <div className="text-center" data-testid="rsvp-no">
            <div className="text-4xl font-bold text-primary">8</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
              No
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" data-testid="tab-overview">
              Overview
            </TabsTrigger>
            <TabsTrigger value="guests" data-testid="tab-guests">
              Guests
            </TabsTrigger>
            <TabsTrigger value="potluck" data-testid="tab-potluck">
              Potluck Board
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
                      <Megaphone className="w-3 h-3 mr-1" />
                      Comm Lead
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
                  onClick={onManageHostTeam}
                  data-testid="button-manage-host-team"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Host Team
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
                  Gift Registry
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
                  onClick={onPhotoAlbum}
                  data-testid="button-photo-album"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Photo Album
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={onLocationDetails}
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
            <div className="space-y-6">
              {/* Manage Guest List Button */}
              <Button
                variant="default"
                className="w-full"
                onClick={onManageGuests}
                data-testid="button-manage-guests"
              >
                <ClipboardList className="w-4 h-4 mr-2" />
                Manage Guest List
              </Button>

              {/* Import Button */}
              <Button
                variant="secondary"
                className="w-full"
                data-testid="button-import-contacts"
              >
                + Import from Contacts
              </Button>

              {/* Search */}
              <input
                type="text"
                placeholder="Search guests..."
                className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                data-testid="input-search-guests"
              />

              {/* Attending Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Attending (28)</h3>
                <div className="space-y-3">
                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">Emily Chen</span>
                          <span className="text-emerald-600 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Yes</span>
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">No additional guests</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">Michael Rodriguez</span>
                          <span className="text-emerald-600 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Yes</span>
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Bringing mac & cheese</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">Sarah Martinez</span>
                          <span className="text-emerald-600 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Yes</span>
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">+2 guests</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maybe Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Maybe (3)</h3>
                <div className="space-y-3">
                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">Alex Johnson</span>
                          <span className="text-amber-600 flex items-center gap-1">
                            <span className="text-sm">? Maybe</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Not Yet Responded Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Not Yet Responded (8)</h3>
                <div className="space-y-3">
                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">Jordan Taylor</span>
                          <span className="text-muted-foreground text-sm">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="potluck" className="mt-6">
            <div className="space-y-6">
              {/* Info Note - Different for Potluck */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  This is a potluck event - guests can claim items to bring.
                </p>
              </div>

              {/* Appetizers */}
              <PotluckSection title="Appetizers">
                <PotluckItem name="Chips & Salsa" claimedBy="Unclaimed" />
                <PotluckItem name="Veggie Platter" claimedBy="Unclaimed" />
                <PotluckItem name="Cheese & Crackers" claimedBy="Unclaimed" />
                <PotluckItem name="Spinach Dip" claimedBy="Unclaimed" />
              </PotluckSection>

              {/* Main Dishes */}
              <PotluckSection title="Main Dishes">
                <PotluckItem name="Honey Glazed Ham" claimedBy="Unclaimed" />
                <PotluckItem name="Mac & Cheese" claimedBy="Unclaimed" />
                <PotluckItem name="Pasta Salad" claimedBy="Unclaimed" />
                <PotluckItem name="Green Bean Casserole" claimedBy="Unclaimed" />
              </PotluckSection>

              {/* Sides */}
              <PotluckSection title="Sides">
                <PotluckItem name="Mashed Potatoes" claimedBy="Unclaimed" />
                <PotluckItem name="Dinner Rolls" claimedBy="Unclaimed" />
                <PotluckItem name="Cranberry Sauce" claimedBy="Unclaimed" />
              </PotluckSection>

              {/* Desserts */}
              <PotluckSection title="Desserts">
                <PotluckItem name="Pumpkin Pie" claimedBy="Unclaimed" />
                <PotluckItem name="Chocolate Cake" claimedBy="Unclaimed" />
                <PotluckItem name="Cookies" claimedBy="Nobody - I do for them" />
              </PotluckSection>

              {/* Drinks */}
              <PotluckSection title="Drinks">
                <div className="space-y-3">
                  {/* Drink Calculator Button */}
                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-base mb-1">Need help with drink quantities?</div>
                        <p className="text-sm text-muted-foreground">
                          Use our drink calculator for recommendations
                        </p>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-2" 
                      onClick={onDrinkCalculator}
                      data-testid="button-calculate-drinks"
                    >
                      Calculate
                    </Button>
                  </div>

                  <PotluckItem name="Eggnog" claimedBy="Unclaimed" />
                  <PotluckItem name="Beer (2 cases)" claimedBy="Unclaimed" />
                  <PotluckItem name="Wine (4 bottles)" claimedBy="Unclaimed" />
                  <PotluckItem name="Sodas" claimedBy="Unclaimed" />
                  <PotluckItem name="Sparkling Cider" claimedBy="Unclaimed" />
                  <PotluckItem name="Water & Ice" claimedBy="Unclaimed" />
                </div>
              </PotluckSection>

              {/* Last Minute Needs */}
              <PotluckSection title="Last Minute Needs">
                <PotluckItem name="Ice" claimedBy="Unclaimed - but its need" />
                <PotluckItem name="Paper Plates" claimedBy="Unclaimed" />
              </PotluckSection>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button variant="secondary" className="w-full" data-testid="button-add-potluck-item">
                  + Add Potluck Item
                </Button>
                <Button variant="secondary" className="w-full" data-testid="button-add-last-minute-need">
                  + Add Last Minute Need
                </Button>
              </div>
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

// Helper component for collapsible potluck sections
function PotluckSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          className="w-full flex items-center justify-between p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20 hover-elevate"
          data-testid={`section-${title.toLowerCase().replace(/\s/g, '-')}`}
        >
          <span className="font-semibold text-lg text-primary">{title}</span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-primary" />
          ) : (
            <ChevronDown className="w-5 h-5 text-primary" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <div className="space-y-3">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// Helper component for potluck items with claim functionality
function PotluckItem({ name, claimedBy }: { name: string; claimedBy: string }) {
  const isUnclaimed = claimedBy.includes("Unclaimed");
  
  return (
    <div className="bg-card rounded-lg p-4 border border-card-border">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="font-semibold text-base">{name}</div>
          <p className={`text-sm mt-1 ${isUnclaimed ? 'text-muted-foreground' : 'text-primary'}`}>
            {claimedBy}
          </p>
        </div>
        {isUnclaimed && (
          <Button 
            variant="secondary" 
            size="sm"
            data-testid={`button-claim-${name.toLowerCase().replace(/\s/g, '-')}`}
          >
            Claim
          </Button>
        )}
      </div>
    </div>
  );
}
