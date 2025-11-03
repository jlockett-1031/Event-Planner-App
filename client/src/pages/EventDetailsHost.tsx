import { useState } from "react";
import { ArrowLeft, UtensilsCrossed, Wine, Gift, Music, Camera, MapPin, Check, ChevronDown, ChevronUp, Info, ClipboardList, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface EventDetailsHostProps {
  onBack?: () => void;
  onManageGuests?: () => void;
  onManagePotluck?: () => void;
  onDrinkCalculator?: () => void;
  onGiftRegistry?: () => void;
  onMusicPlaylist?: () => void;
  onHostActivity?: () => void;
  onPhotoAlbum?: () => void;
  onLocationDetails?: () => void;
}

export default function EventDetailsHost({
  onBack,
  onManageGuests,
  onManagePotluck,
  onDrinkCalculator,
  onGiftRegistry,
  onMusicPlaylist,
  onHostActivity,
  onPhotoAlbum,
  onLocationDetails,
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
                <h3 className="text-xl font-bold mb-4">Attending (35)</h3>
                <div className="space-y-3">
                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">Jake Thompson</span>
                          <span className="text-emerald-600 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Yes</span>
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">+1 guest</p>
                      </div>
                    </div>
                  </div>

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
                        <p className="text-sm text-muted-foreground mt-1">Bringing chips & salsa</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maybe Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Maybe (5)</h3>
                <div className="space-y-3">
                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">Alex Kim</span>
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
                <h3 className="text-xl font-bold mb-4">Not Yet Responded (10)</h3>
                <div className="space-y-3">
                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">Jordan Lee</span>
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
              {/* Info Note */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  This is a host-provided menu. Guests will view the menu and can note dietary restrictions.
                </p>
              </div>

              {/* Appetizers */}
              <MenuSection title="Appetizers">
                <MenuItem name="Shrimp Cocktail" provider="Host Provided" />
                <MenuItem name="Cheese & Crackers Platter" provider="Host Provided" />
              </MenuSection>

              {/* Main Dishes */}
              <MenuSection title="Main Dishes">
                <MenuItem name="BBQ Ribs" provider="Host Provided" />
                <MenuItem name="Grilled Chicken" provider="Host Provided" />
                <MenuItem name="Vegetarian Pasta" provider="Host Provided - Vegetarian" />
              </MenuSection>

              {/* Sides */}
              <MenuSection title="Sides">
                <MenuItem name="Coleslaw" provider="Host Provided" />
                <MenuItem name="Corn on the Cob" provider="Host Provided" />
              </MenuSection>

              {/* Desserts */}
              <MenuSection title="Desserts">
                <MenuItem name="Graduation Cake" provider="Host Provided" />
                <MenuItem name="Cookies" provider="Host Provided" />
              </MenuSection>

              {/* Drinks */}
              <MenuSection title="Drinks">
                <div className="space-y-3">
                  {/* Drink Calculator Button */}
                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-base mb-1">Use Drink Calculator</div>
                        <p className="text-sm text-muted-foreground">
                          Get personalized drink recommendations based on your guest count
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

                  <MenuItem name="Beer (3 cases, 24-pack)" provider="" />
                  <MenuItem name="Wine (6 bottles: 4 white, 2 red)" provider="" />
                  <MenuItem name="Soft Drinks (10 bottles, 2-liter)" provider="Host Provided - From Drink Calculator" />
                  <MenuItem name="Water (3 cases, 24-pack)" provider="" />
                  <MenuItem name="Ice (4 bags, 20 lb each)" provider="" />
                </div>
              </MenuSection>

              {/* Guest Dietary Restrictions */}
              <MenuSection title="Guest Dietary Restrictions (5)">
                <div className="space-y-2">
                  <DietaryRestriction name="Emily Chen" restriction="Vegetarian" color="green" />
                  <DietaryRestriction name="Michael Rodriguez" restriction="Gluten-free" color="yellow" />
                  <DietaryRestriction name="Sarah Martinez" restriction="Nut allergy" color="yellow" />
                  <DietaryRestriction name="Alex Kim" restriction="Lactose intolerant" color="yellow" />
                  <DietaryRestriction name="Jordan Lee" restriction="Vegan" color="green" />
                </div>
              </MenuSection>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button variant="secondary" className="w-full" data-testid="button-add-menu-item">
                  + Add Menu Item
                </Button>
                <Button variant="secondary" className="w-full" data-testid="button-generate-shopping-list">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Generate Shopping List
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

// Helper component for collapsible menu sections
function MenuSection({ title, children }: { title: string; children: React.ReactNode }) {
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

// Helper component for menu items
function MenuItem({ name, provider }: { name: string; provider: string }) {
  return (
    <div className="bg-card rounded-lg p-4 border border-card-border">
      <div className="font-semibold text-base">{name}</div>
      {provider && <p className="text-sm text-muted-foreground mt-1">{provider}</p>}
    </div>
  );
}

// Helper component for dietary restrictions
function DietaryRestriction({ 
  name, 
  restriction, 
  color 
}: { 
  name: string; 
  restriction: string; 
  color: "green" | "yellow" 
}) {
  const bgColor = color === "green" 
    ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800" 
    : "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800";
  
  return (
    <div className={`rounded-lg p-4 border ${bgColor}`}>
      <div className="font-semibold text-base">{name}: {restriction}</div>
    </div>
  );
}
