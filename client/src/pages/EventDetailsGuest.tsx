import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Clock, Music, UtensilsCrossed, Info, Plus, ExternalLink, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";

interface EventDetailsGuestProps {
  eventId: string;
  onBack?: () => void;
}

// Component for potluck items that can be claimed
function PotluckItemClaim({ name, claimedBy }: { name: string; claimedBy: string }) {
  const [claimed, setClaimed] = useState(claimedBy !== "Unclaimed");
  const [claimer, setClaimer] = useState(claimedBy);

  const handleClaim = () => {
    setClaimed(true);
    setClaimer("You");
  };

  const handleUnclaim = () => {
    setClaimed(false);
    setClaimer("Unclaimed");
  };

  return (
    <div className="bg-card rounded-lg p-4 border border-card-border">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="font-semibold text-base">{name}</div>
          {claimed ? (
            <p className="text-sm text-primary mt-1">{claimer}</p>
          ) : (
            <p className="text-sm text-muted-foreground mt-1">{claimer}</p>
          )}
        </div>
        {claimed && claimer === "You" ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleUnclaim}
            data-testid={`button-unclaim-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            Unclaim
          </Button>
        ) : !claimed ? (
          <Button
            variant="default"
            size="sm"
            onClick={handleClaim}
            data-testid={`button-claim-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            Claim
          </Button>
        ) : null}
      </div>
    </div>
  );
}

// Component for registry items that can be purchased
function RegistryItem({ name, store, price, purchasedBy, link }: { 
  name: string; 
  store: string; 
  price: string; 
  purchasedBy: string;
  link?: string;
}) {
  const [purchased, setPurchased] = useState(purchasedBy !== "Available");
  const [purchaser, setPurchaser] = useState(purchasedBy);

  const handlePurchaseNow = () => {
    // Open the store link
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
    // Mark as purchased
    setPurchased(true);
    setPurchaser("You");
  };

  const handleUnpurchase = () => {
    setPurchased(false);
    setPurchaser("Available");
  };

  return (
    <div className="bg-card rounded-lg p-4 border border-card-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="font-semibold text-base mb-1">{name}</div>
          <div className="text-sm text-muted-foreground mb-2">{store} • {price}</div>
          {purchased ? (
            <Badge variant="secondary" className="text-xs">
              Purchased
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs">
              Available
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {purchased && purchaser === "You" ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleUnpurchase}
              data-testid={`button-unmark-${name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              Unmark
            </Button>
          ) : !purchased ? (
            <Button
              variant="default"
              size="sm"
              onClick={handlePurchaseNow}
              data-testid={`button-purchase-${name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              Purchase Now!
            </Button>
          ) : (
            <Badge variant="secondary" className="text-xs">
              Purchased by {purchaser}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

// Collapsible section for potluck categories
function PotluckSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className="w-full bg-primary/10 rounded-lg p-4 flex items-center justify-between hover-elevate active-elevate-2"
        data-testid={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">
          {isOpen ? "Hide" : "View"}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 space-y-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

interface Song {
  title: string;
  artist: string;
}

export default function EventDetailsGuest({ eventId, onBack }: EventDetailsGuestProps) {
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [playlist, setPlaylist] = useState<Song[]>([
    { title: "Auld Lang Syne", artist: "Traditional" },
    { title: "Celebration", artist: "Kool & The Gang" },
    { title: "Don't Stop Believin'", artist: "Journey" },
  ]);

  // Mock data based on eventId
  const isNewYearsEve = eventId === "3";
  const isCountdownParty = eventId === "6";
  
  const eventData = isNewYearsEve ? {
    name: "New Year's Eve Bash",
    date: "December 31, 2025",
    time: "9:00 PM",
    location: "Downtown Event Center",
    address: "456 Party Avenue, Suite 100",
    type: "Potluck",
    hostName: "Alex Johnson"
  } : isCountdownParty ? {
    name: "New Year's Countdown Party",
    date: "December 31, 2025",
    time: "8:00 PM",
    location: "Rooftop Lounge",
    address: "789 Sky Plaza, 20th Floor",
    type: "Hosted Meal",
    hostName: "Sarah Martinez"
  } : {
    name: "Mike's Birthday Party",
    date: "January 5, 2026",
    time: "3:00 PM",
    location: "Central Park Pavilion",
    address: "Central Park, North End",
    type: "Hosted Meal",
    hostName: "Mike Chen"
  };

  const handleAddSong = () => {
    if (newSongTitle && newSongArtist) {
      // Add new song to the playlist
      setPlaylist([...playlist, { title: newSongTitle, artist: newSongArtist }]);
      setNewSongTitle("");
      setNewSongArtist("");
      setIsAddingSong(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">{eventData.name}</h1>
          <div className="flex items-center justify-center gap-2 text-white/90 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{eventData.date}</span>
            <span>•</span>
            <Clock className="w-4 h-4" />
            <span>{eventData.time}</span>
          </div>
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

        <div className="space-y-6">
          {/* Event Info Card */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Hosted by</div>
                <div className="font-semibold text-lg">{eventData.hostName}</div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{eventData.type}</Badge>
              </div>
            </div>
          </div>

          {/* Location & Details Card */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Location & Details</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-lg mb-1">{eventData.location}</div>
                <div className="text-muted-foreground">{eventData.address}</div>
              </div>

              <Button
                variant="default"
                className="w-full"
                onClick={() => {
                  const encodedAddress = encodeURIComponent(`${eventData.location}, ${eventData.address}`);
                  window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank', 'noopener,noreferrer');
                }}
                data-testid="button-open-maps"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Google Maps
              </Button>
            </div>
          </div>

          {/* Food & Beverage Menu */}
          {isNewYearsEve ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Food & Beverage</h2>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3 mb-4">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  This is a potluck event! Claim an item below to let others know what you'll bring.
                </p>
              </div>

              <div className="space-y-4">
                <PotluckSection title="Appetizers">
                  <PotluckItemClaim name="Chips & Dip" claimedBy="Sarah M." />
                  <PotluckItemClaim name="Veggie Platter" claimedBy="Unclaimed" />
                  <PotluckItemClaim name="Cheese & Crackers" claimedBy="Unclaimed" />
                </PotluckSection>

                <PotluckSection title="Main Dishes">
                  <PotluckItemClaim name="Pizza" claimedBy="Mike T." />
                  <PotluckItemClaim name="Wings" claimedBy="Unclaimed" />
                  <PotluckItemClaim name="Pasta Salad" claimedBy="Unclaimed" />
                </PotluckSection>

                <PotluckSection title="Desserts">
                  <PotluckItemClaim name="Cookies" claimedBy="Unclaimed" />
                  <PotluckItemClaim name="Brownies" claimedBy="Unclaimed" />
                  <PotluckItemClaim name="Fruit Tray" claimedBy="Unclaimed" />
                </PotluckSection>

                <PotluckSection title="Drinks">
                  <PotluckItemClaim name="Champagne" claimedBy="Host Provided" />
                  <PotluckItemClaim name="Sodas" claimedBy="Unclaimed" />
                  <PotluckItemClaim name="Juice" claimedBy="Unclaimed" />
                  <PotluckItemClaim name="Water & Ice" claimedBy="Unclaimed" />
                </PotluckSection>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Menu</h2>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3 mb-4">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  The host will provide all food and beverages for this event.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-card-border">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Main Course</h3>
                    <p className="text-sm text-muted-foreground">BBQ Ribs & Grilled Chicken</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Sides</h3>
                    <p className="text-sm text-muted-foreground">Coleslaw, Potato Salad, Corn on the Cob</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Dessert</h3>
                    <p className="text-sm text-muted-foreground">Birthday Cake</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Beverages</h3>
                    <p className="text-sm text-muted-foreground">Assorted Sodas & Water</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Music Playlist */}
          {isNewYearsEve && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Music className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Music Playlist</h2>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3 mb-4">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Help create the perfect party atmosphere! Add your favorite songs to the playlist.
                </p>
              </div>

              {/* Current Playlist */}
              <div className="space-y-3 mb-4">
                {playlist.map((song, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-lg p-4 border border-card-border"
                    data-testid={`playlist-song-${index}`}
                  >
                    <div className="font-semibold">{song.title}</div>
                    <div className="text-sm text-muted-foreground">{song.artist}</div>
                  </div>
                ))}
              </div>

              {/* Add Song Section */}
              {!isAddingSong ? (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setIsAddingSong(true)}
                  data-testid="button-add-song"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Suggest a Song
                </Button>
              ) : (
                <div className="bg-card rounded-lg p-4 border border-card-border space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Song Title</label>
                    <Input
                      placeholder="e.g., Party Rock Anthem"
                      value={newSongTitle}
                      onChange={(e) => setNewSongTitle(e.target.value)}
                      data-testid="input-song-title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Artist</label>
                    <Input
                      placeholder="e.g., LMFAO"
                      value={newSongArtist}
                      onChange={(e) => setNewSongArtist(e.target.value)}
                      data-testid="input-song-artist"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAddSong}
                      className="flex-1"
                      data-testid="button-submit-song"
                    >
                      Add to Playlist
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsAddingSong(false);
                        setNewSongTitle("");
                        setNewSongArtist("");
                      }}
                      data-testid="button-cancel-song"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Gift Registry - Only for Mike's Birthday Party */}
          {!isNewYearsEve && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Gift Registry</h2>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3 mb-4">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Help make this birthday special! Choose a gift from the registry and mark it as purchased once you buy it.
                </p>
              </div>

              <div className="space-y-3">
                <RegistryItem
                  name="Wireless Noise-Canceling Headphones"
                  store="Amazon"
                  price="$299.99"
                  purchasedBy="Available"
                  link="https://www.amazon.com"
                />
                <RegistryItem
                  name="Espresso Machine"
                  store="Target"
                  price="$199.99"
                  purchasedBy="Jennifer L."
                  link="https://www.target.com"
                />
                <RegistryItem
                  name="Portable Bluetooth Speaker"
                  store="Best Buy"
                  price="$149.99"
                  purchasedBy="Available"
                  link="https://www.bestbuy.com"
                />
                <RegistryItem
                  name="Professional Chef's Knife Set"
                  store="Williams Sonoma"
                  price="$179.99"
                  purchasedBy="Available"
                  link="https://www.williams-sonoma.com"
                />
                <RegistryItem
                  name="Smart Watch"
                  store="Amazon"
                  price="$249.99"
                  purchasedBy="Available"
                  link="https://www.amazon.com"
                />
                <RegistryItem
                  name="Leather Messenger Bag"
                  store="Nordstrom"
                  price="$189.99"
                  purchasedBy="Available"
                  link="https://www.nordstrom.com"
                />
              </div>
            </div>
          )}

          {/* RSVP Section */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <h3 className="text-xl font-semibold mb-4">Your RSVP</h3>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                Attending
              </Badge>
            </div>
            <Button variant="secondary" className="w-full" data-testid="button-change-rsvp">
              Change RSVP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
