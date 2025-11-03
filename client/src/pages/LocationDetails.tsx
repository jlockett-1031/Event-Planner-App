import { useState } from "react";
import { ArrowLeft, MapPin, Globe, Lock, Info, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface LocationDetailsProps {
  onBack?: () => void;
}

export default function LocationDetails({ onBack }: LocationDetailsProps) {
  const [venueName, setVenueName] = useState("The Garden Terrace");
  const [streetAddress, setStreetAddress] = useState("123 Celebration Ave");
  const [city, setCity] = useState("San Francisco");
  const [state, setState] = useState("CA");
  const [zipCode, setZipCode] = useState("94102");
  const [specialInstructions, setSpecialInstructions] = useState("Enter through the main gate and follow the path to the terrace. Parking available in the adjacent lot.");
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [enableMapLink, setEnableMapLink] = useState(true);
  
  const fullAddress = `${streetAddress}, ${city}, ${state} ${zipCode}`;
  const mapLink = `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
  };

  const handleSaveChanges = () => {
    console.log("Saving location details...");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Location & Details</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 dark:text-blue-100">
              Configure your event location and control what location information guests can see.
            </p>
          </div>

          {/* Venue Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Venue Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="venue-name">Venue Name</Label>
                <Input
                  id="venue-name"
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="e.g., The Garden Terrace"
                  data-testid="input-venue-name"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="street-address">Street Address</Label>
                <Input
                  id="street-address"
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="e.g., 123 Celebration Ave"
                  data-testid="input-street-address"
                  className="mt-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g., San Francisco"
                    data-testid="input-city"
                    className="mt-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="CA"
                      data-testid="input-state"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip-code">Zip Code</Label>
                    <Input
                      id="zip-code"
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="94102"
                      data-testid="input-zip-code"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="special-instructions">Special Instructions</Label>
                <Textarea
                  id="special-instructions"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Parking info, entry instructions, accessibility notes, etc."
                  rows={4}
                  data-testid="input-special-instructions"
                  className="mt-1.5"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Add helpful details like parking, entry instructions, or accessibility information
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div>
            <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                <div className="flex-1">
                  <div className="font-semibold flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Show full address to guests
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Display complete street address to all guests
                  </p>
                </div>
                <Switch
                  checked={showFullAddress}
                  onCheckedChange={setShowFullAddress}
                  data-testid="switch-show-full-address"
                />
              </div>

              <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                <div className="flex-1">
                  <div className="font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Enable map link for guests
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Allow guests to open the location in maps
                  </p>
                </div>
                <Switch
                  checked={enableMapLink}
                  onCheckedChange={setEnableMapLink}
                  data-testid="switch-enable-map-link"
                />
              </div>

              {!showFullAddress && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3">
                  <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900 dark:text-amber-100">
                    <p className="font-medium mb-1">Address hidden from guests</p>
                    <p>
                      Guests will only see the venue name and city. The full address will be revealed 
                      closer to the event date or when they RSVP.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Address Preview */}
          <div>
            <h2 className="text-xl font-bold mb-4">Address Preview</h2>
            <div className="bg-card rounded-lg p-4 border border-card-border space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{venueName}</p>
                  {showFullAddress ? (
                    <p className="text-sm text-muted-foreground">{fullAddress}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {city}, {state} <span className="text-xs">(Full address hidden)</span>
                    </p>
                  )}
                  {specialInstructions && (
                    <p className="text-sm text-muted-foreground mt-2">{specialInstructions}</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyAddress}
                  data-testid="button-copy-address"
                >
                  <Copy className="w-3 h-3 mr-2" />
                  Copy Address
                </Button>
                {enableMapLink && showFullAddress && (
                  <Button
                    variant="secondary"
                    size="sm"
                    asChild
                    data-testid="button-open-map"
                  >
                    <a href={mapLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Open in Maps
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* What Guests See */}
          <div>
            <h2 className="text-xl font-bold mb-4">What Guests See</h2>
            <div className="bg-muted/50 rounded-lg p-4 border-2 border-dashed border-border">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">{venueName}</p>
                  {showFullAddress ? (
                    <>
                      <p className="text-sm text-muted-foreground">{fullAddress}</p>
                      {enableMapLink && (
                        <a
                          href={mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-1"
                          data-testid="link-guest-map-preview"
                        >
                          Get Directions
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {city}, {state}
                      <br />
                      <span className="text-xs italic">Full address will be shared closer to the event</span>
                    </p>
                  )}
                  {specialInstructions && showFullAddress && (
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      {specialInstructions}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1"
              onClick={handleSaveChanges}
              data-testid="button-save-changes"
            >
              Save Changes
            </Button>
            <Button
              variant="secondary"
              onClick={onBack}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
