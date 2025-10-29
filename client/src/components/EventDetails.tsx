import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, ArrowLeft, Edit, Trash2 } from "lucide-react";
import RSVPStats from "./RSVPStats";
import GuestList, { type Guest } from "./GuestList";
import PotluckList, { type PotluckItem } from "./PotluckList";
import ActivityFeed, { type Activity } from "./ActivityFeed";

export interface EventDetailsData {
  id: string;
  name: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxAttendees?: number;
  isHost: boolean;
  rsvpStats: {
    yes: number;
    maybe: number;
    no: number;
  };
  guests: Guest[];
  potluckItems: PotluckItem[];
  activities: Activity[];
}

interface EventDetailsProps {
  event: EventDetailsData;
  onBack?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onRSVP?: (response: "yes" | "no" | "maybe") => void;
}

export default function EventDetails({
  event,
  onBack,
  onEdit,
  onDelete,
  onRSVP,
}: EventDetailsProps) {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary mb-6 hover:underline"
        data-testid="button-back"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Events
      </button>

      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold">{event.name}</h1>
          {event.isHost && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onEdit}
                data-testid="button-edit"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onDelete}
                data-testid="button-delete"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-5 h-5" />
            <span>
              {event.date} at {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span>{event.location}</span>
          </div>
          {event.maxAttendees && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5" />
              <span>Max {event.maxAttendees} attendees</span>
            </div>
          )}
        </div>

        {!event.isHost && (
          <div className="flex gap-3 mb-6">
            <Button
              onClick={() => onRSVP?.("yes")}
              data-testid="button-rsvp-yes"
              className="flex-1"
            >
              RSVP Yes
            </Button>
            <Button
              onClick={() => onRSVP?.("maybe")}
              variant="outline"
              data-testid="button-rsvp-maybe"
              className="flex-1"
            >
              Maybe
            </Button>
            <Button
              onClick={() => onRSVP?.("no")}
              variant="outline"
              data-testid="button-rsvp-no"
              className="flex-1"
            >
              Can't Go
            </Button>
          </div>
        )}

        <RSVPStats
          yesCount={event.rsvpStats.yes}
          maybeCount={event.rsvpStats.maybe}
          noCount={event.rsvpStats.no}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details" data-testid="tab-details">
            Details
          </TabsTrigger>
          <TabsTrigger value="guests" data-testid="tab-guests">
            Guests
          </TabsTrigger>
          <TabsTrigger value="potluck" data-testid="tab-potluck">
            Potluck
          </TabsTrigger>
          <TabsTrigger value="activity" data-testid="tab-activity">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="bg-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Event Description</h3>
            <p className="text-muted-foreground">
              {event.description || "No description provided."}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="guests" className="mt-6">
          <div className="bg-card rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Guest List</h3>
              {event.isHost && (
                <Button size="sm" data-testid="button-invite-guests">
                  Invite Guests
                </Button>
              )}
            </div>
            <GuestList guests={event.guests} />
          </div>
        </TabsContent>

        <TabsContent value="potluck" className="mt-6">
          <div className="bg-card rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Potluck Items</h3>
              {event.isHost && (
                <Button size="sm" data-testid="button-add-item">
                  Add Item
                </Button>
              )}
            </div>
            <PotluckList items={event.potluckItems} isHost={event.isHost} />
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <div className="bg-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <ActivityFeed activities={event.activities} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
