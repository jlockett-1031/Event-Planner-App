import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventSettingsProps {
  onBack?: () => void;
}

export default function EventSettings({ onBack }: EventSettingsProps) {
  const [formData, setFormData] = useState({
    name: "Sarah's Graduation Party",
    date: "2025-12-15",
    time: "16:00",
    location: "123 Main Street, Apartment 4B",
    description: "Join us to celebrate Sarah's graduation!",
    privacy: "private",
    rsvpDeadline: "2025-12-10",
    guestLimit: "50",
    allowPlusOnes: true,
  });

  const handleSave = () => {
    console.log("Saving event settings:", formData);
    alert("Event settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Event Settings</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Event
        </button>

        <div className="space-y-6">
          {/* Event Details Section */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <h2 className="text-xl font-bold mb-6">Edit Event Details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Event Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  data-testid="input-event-name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                    data-testid="input-time"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  data-testid="input-location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-24"
                  data-testid="textarea-description"
                />
              </div>
            </div>
          </div>

          {/* Privacy Settings Section */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <h2 className="text-xl font-bold mb-6">Privacy Settings</h2>
            
            <div className="space-y-2">
              <Label htmlFor="privacy">Event Privacy</Label>
              <Select
                value={formData.privacy}
                onValueChange={(value) => setFormData({ ...formData, privacy: value })}
              >
                <SelectTrigger data-testid="select-privacy">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public - Anyone can view and RSVP</SelectItem>
                  <SelectItem value="private">Private - Only invited guests can view</SelectItem>
                  <SelectItem value="unlisted">Unlisted - Anyone with link can view</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                {formData.privacy === "public" && "Your event will be visible to everyone and searchable."}
                {formData.privacy === "private" && "Only guests you invite will be able to see this event."}
                {formData.privacy === "unlisted" && "Your event won't appear in searches, but anyone with the link can view it."}
              </p>
            </div>
          </div>

          {/* RSVP & Guest Settings Section */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <h2 className="text-xl font-bold mb-6">RSVP & Guest Settings</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rsvpDeadline">RSVP Deadline</Label>
                <Input
                  id="rsvpDeadline"
                  type="date"
                  value={formData.rsvpDeadline}
                  onChange={(e) => setFormData({ ...formData, rsvpDeadline: e.target.value })}
                  data-testid="input-rsvp-deadline"
                />
                <p className="text-sm text-muted-foreground">
                  Guests will be reminded to RSVP before this date.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestLimit">Guest Limit</Label>
                <Input
                  id="guestLimit"
                  type="number"
                  value={formData.guestLimit}
                  onChange={(e) => setFormData({ ...formData, guestLimit: e.target.value })}
                  placeholder="Leave blank for unlimited"
                  data-testid="input-guest-limit"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum number of guests who can RSVP "Yes". Leave blank for no limit.
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="allowPlusOnes" className="font-semibold cursor-pointer">
                    Allow +1s
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Let guests bring a plus-one to the event
                  </p>
                </div>
                <Switch
                  id="allowPlusOnes"
                  checked={formData.allowPlusOnes}
                  onCheckedChange={(checked) => setFormData({ ...formData, allowPlusOnes: checked })}
                  data-testid="switch-allow-plus-ones"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button
            className="w-full"
            onClick={handleSave}
            data-testid="button-save-settings"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
