import { useState } from "react";
import { ArrowLeft, Info, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface DrinkCalculatorProps {
  onBack?: () => void;
  onCalculate?: () => void;
  onAdvancedOptions?: () => void;
}

export default function DrinkCalculator({ onBack, onCalculate, onAdvancedOptions }: DrinkCalculatorProps) {
  const [guestCount, setGuestCount] = useState("50");
  const [duration, setDuration] = useState<"3" | "4" | "5+">("4");
  const [vibe, setVibe] = useState([50]);
  const [foodServed, setFoodServed] = useState(true);
  const [outdoorEvent, setOutdoorEvent] = useState(false);
  const [childrenAttending, setChildrenAttending] = useState(false);
  const [alcoholFree, setAlcoholFree] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <h1 className="text-3xl font-bold">Drink Calculator</h1>
          <Wine className="w-8 h-8" />
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

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3 mb-6">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900 dark:text-blue-100">
            Calculate exactly how much beer, wine, spirits, and non-alcoholic drinks you need based on your guest count and event details.
          </p>
        </div>

        {/* Event Details */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Event Details</h2>

          {/* Number of Guests */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Number of Guests <span className="text-destructive">*</span>
            </label>
            <Input
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              data-testid="input-guest-count"
            />
            <p className="text-sm text-muted-foreground mt-1">Currently: 50 guests RSVPed</p>
          </div>

          {/* Event Duration */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Duration <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={duration === "3" ? "default" : "secondary"}
                onClick={() => setDuration("3")}
                data-testid="button-duration-3"
              >
                3 Hours
              </Button>
              <Button
                variant={duration === "4" ? "default" : "secondary"}
                onClick={() => setDuration("4")}
                data-testid="button-duration-4"
              >
                4 Hours
              </Button>
              <Button
                variant={duration === "5+" ? "default" : "secondary"}
                onClick={() => setDuration("5+")}
                data-testid="button-duration-5plus"
              >
                5+ Hours
              </Button>
            </div>
          </div>

          {/* Event Vibe */}
          <div>
            <label className="block text-sm font-medium mb-2">Event Vibe</label>
            <div className="space-y-2">
              <Slider
                value={vibe}
                onValueChange={setVibe}
                max={100}
                step={1}
                className="w-full"
                data-testid="slider-event-vibe"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Casual</span>
                <span>Big Party</span>
              </div>
              <p className="text-sm text-muted-foreground text-center">Moderate celebration</p>
            </div>
          </div>

          {/* Additional Factors */}
          <div className="pt-4">
            <h2 className="text-xl font-bold mb-4">Additional Factors (Optional)</h2>

            <div className="space-y-4">
              {/* Food will be served */}
              <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                <div className="flex-1">
                  <div className="font-semibold">Food will be served</div>
                  <p className="text-sm text-muted-foreground">Reduces alcohol consumption by 25%</p>
                </div>
                <Switch
                  checked={foodServed}
                  onCheckedChange={setFoodServed}
                  data-testid="switch-food-served"
                />
              </div>

              {/* Outdoor event */}
              <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                <div className="flex-1">
                  <div className="font-semibold">Outdoor event</div>
                  <p className="text-sm text-muted-foreground">Increases water/ice needs by 50%</p>
                </div>
                <Switch
                  checked={outdoorEvent}
                  onCheckedChange={setOutdoorEvent}
                  data-testid="switch-outdoor-event"
                />
              </div>

              {/* Children attending */}
              <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                <div className="flex-1">
                  <div className="font-semibold">Children attending</div>
                  <p className="text-sm text-muted-foreground">Adjusts for non-drinkers</p>
                </div>
                <Switch
                  checked={childrenAttending}
                  onCheckedChange={setChildrenAttending}
                  data-testid="switch-children-attending"
                />
              </div>

              {/* Alcohol-free event */}
              <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                <div className="flex-1">
                  <div className="font-semibold">Alcohol-free event</div>
                  <p className="text-sm text-muted-foreground">Show only non-alcoholic beverages</p>
                </div>
                <Switch
                  checked={alcoholFree}
                  onCheckedChange={setAlcoholFree}
                  data-testid="switch-alcohol-free"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button 
              className="w-full" 
              onClick={onCalculate}
              data-testid="button-calculate"
            >
              Calculate Drink Needs
            </Button>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={onAdvancedOptions}
              data-testid="button-advanced-options"
            >
              Advanced Options (Drink Preferences)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
