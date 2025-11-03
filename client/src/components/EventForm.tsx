import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, UtensilsCrossed, Users, Gift } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface EventFormProps {
  onBack?: () => void;
  onSubmit?: (event: EventFormData) => void;
}

export interface EventFormData {
  name: string;
  type: string;
  menuType: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxAttendees: string;
  hasRegistry: boolean;
}

export default function EventForm({ onBack, onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    type: "birthday",
    menuType: "set-menu",
    date: "",
    time: "",
    location: "",
    description: "",
    maxAttendees: "",
    hasRegistry: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    console.log("Event created:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary mb-6 hover:underline"
        data-testid="button-back"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h2 className="text-3xl font-bold mb-6">Create Event</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Event Name *</Label>
          <Input
            id="name"
            placeholder="e.g., Sarah's Graduation Party"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            data-testid="input-event-name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Event Type *</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger data-testid="select-event-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="birthday">Birthday</SelectItem>
              <SelectItem value="graduation">Graduation</SelectItem>
              <SelectItem value="baby-shower">Baby Shower</SelectItem>
              <SelectItem value="holiday">Holiday Party</SelectItem>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Food & Beverage Menu Type *</Label>
          <RadioGroup
            value={formData.menuType}
            onValueChange={(value) => setFormData({ ...formData, menuType: value })}
            data-testid="radio-menu-type"
          >
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover-elevate">
              <RadioGroupItem value="set-menu" id="set-menu" data-testid="radio-set-menu" />
              <div className="flex-1">
                <Label htmlFor="set-menu" className="flex items-center gap-2 font-semibold cursor-pointer">
                  <UtensilsCrossed className="w-4 h-4" />
                  Set Menu
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  You provide all food and beverages for the event
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover-elevate">
              <RadioGroupItem value="potluck" id="potluck" data-testid="radio-potluck" />
              <div className="flex-1">
                <Label htmlFor="potluck" className="flex items-center gap-2 font-semibold cursor-pointer">
                  <Users className="w-4 h-4" />
                  Potluck
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Guests bring dishes to share at the event
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              data-testid="input-date"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time *</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
              data-testid="input-time"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            placeholder="e.g., 123 Main St, Apartment 4B"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
            data-testid="input-location"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Tell guests about your event..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="min-h-32"
            data-testid="textarea-description"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxAttendees">Maximum Attendees (Optional)</Label>
          <Input
            id="maxAttendees"
            type="number"
            placeholder="Leave blank for unlimited"
            value={formData.maxAttendees}
            onChange={(e) =>
              setFormData({ ...formData, maxAttendees: e.target.value })
            }
            data-testid="input-max-attendees"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 border rounded-lg hover-elevate">
            <Checkbox
              id="hasRegistry"
              checked={formData.hasRegistry}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, hasRegistry: checked as boolean })
              }
              data-testid="checkbox-has-registry"
            />
            <div className="flex-1">
              <Label htmlFor="hasRegistry" className="flex items-center gap-2 font-semibold cursor-pointer">
                <Gift className="w-4 h-4" />
                Add Gift Registry
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Create a registry where guests can view and purchase gifts for your event
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="flex-1" data-testid="button-create-event">
            Create Event
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
