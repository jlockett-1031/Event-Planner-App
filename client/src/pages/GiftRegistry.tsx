import { useState } from "react";
import { ArrowLeft, Info, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface GiftRegistryProps {
  onBack?: () => void;
}

export default function GiftRegistry({ onBack }: GiftRegistryProps) {
  const [registryType, setRegistryType] = useState("external");
  const [showToGuests, setShowToGuests] = useState(true);
  const [includeOptionalMessage, setIncludeOptionalMessage] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Gift Registry</h1>
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

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3 mb-6">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900 dark:text-blue-100">
            Share your gift registry or wishlist with guests. They'll see it on the event page.
          </p>
        </div>

        <div className="space-y-6">
          {/* Registry Type */}
          <div>
            <h2 className="text-xl font-bold mb-4">Registry Type</h2>
            <RadioGroup value={registryType} onValueChange={setRegistryType}>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-card-border">
                  <RadioGroupItem 
                    value="external" 
                    id="external" 
                    className="mt-1" 
                    data-testid="radio-registry-type-external"
                  />
                  <Label htmlFor="external" className="flex-1 cursor-pointer">
                    <div className="font-semibold">External Registry Link</div>
                    <p className="text-sm text-muted-foreground">
                      Link to Amazon, Target, or other registries
                    </p>
                  </Label>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-card-border">
                  <RadioGroupItem 
                    value="group" 
                    id="group" 
                    className="mt-1"
                    data-testid="radio-registry-type-group"
                  />
                  <Label htmlFor="group" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Group Gift Collection</div>
                    <p className="text-sm text-muted-foreground">
                      Collect money from guests for a specific gift
                    </p>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Your Registry */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Registry</h2>
            <div className="bg-card rounded-lg p-4 border border-card-border space-y-3">
              <div>
                <div className="font-semibold text-lg">Amazon Wishlist</div>
                <p className="text-sm text-muted-foreground">12 items • Created Jan 2025</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  amazon.com/registry/sarah-graduation
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1" data-testid="button-edit-registry">
                  Edit
                </Button>
                <Button variant="secondary" className="flex-1" data-testid="button-remove-registry">
                  Remove
                </Button>
              </div>
            </div>

            <Button
              variant="secondary"
              className="w-full mt-3"
              data-testid="button-add-registry"
            >
              + Add Another Registry
            </Button>
          </div>

          {/* Registry Settings */}
          <div>
            <h2 className="text-xl font-bold mb-4">Registry Settings</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                <div className="flex-1">
                  <div className="font-semibold">Show registry to guests</div>
                  <p className="text-sm text-muted-foreground">
                    Guests will see your registry on the event page
                  </p>
                </div>
                <Switch
                  checked={showToGuests}
                  onCheckedChange={setShowToGuests}
                  data-testid="switch-show-registry"
                />
              </div>

              <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                <div className="flex-1">
                  <div className="font-semibold">Include "gifts optional" message</div>
                  <p className="text-sm text-muted-foreground">
                    Reminds guests that gifts are not required
                  </p>
                </div>
                <Switch
                  checked={includeOptionalMessage}
                  onCheckedChange={setIncludeOptionalMessage}
                  data-testid="switch-gifts-optional"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="border-2 border-dashed border-border rounded-lg p-6 bg-card/50">
              <p className="text-sm text-muted-foreground text-center mb-4">
                This is how guests will see your registry:
              </p>

              <div className="bg-card rounded-lg p-6 border border-card-border text-center space-y-4">
                <div>
                  <div className="font-semibold text-lg">Amazon Wishlist</div>
                  <p className="text-sm text-muted-foreground">12 items available</p>
                </div>
                <Button className="w-full" data-testid="button-view-registry-preview">
                  View Registry
                </Button>
              </div>

              {includeOptionalMessage && (
                <div className="mt-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900 dark:text-amber-100">
                    <span className="font-semibold">Tip:</span> Gifts are optional! Your presence is the best present.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
