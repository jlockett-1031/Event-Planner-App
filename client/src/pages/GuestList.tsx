import { ArrowLeft, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Guest {
  id: string;
  name: string;
  rsvp: "yes" | "maybe" | "pending";
  note?: string;
}

interface GuestListProps {
  onBack?: () => void;
}

export default function GuestList({ onBack }: GuestListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock guest data
  const attendingGuests: Guest[] = [
    { id: "1", name: "Jake Thompson", rsvp: "yes", note: "+1 guest" },
    { id: "2", name: "Emily Chen", rsvp: "yes", note: "No additional guests" },
    { id: "3", name: "Michael Rodriguez", rsvp: "yes", note: "Bringing chips & salsa" },
  ];

  const maybeGuests: Guest[] = [
    { id: "4", name: "Alex Kim", rsvp: "maybe" },
  ];

  const pendingGuests: Guest[] = [
    { id: "5", name: "Jordan Lee", rsvp: "pending" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Guest List</h1>
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

        {/* Import Button */}
        <Button
          variant="secondary"
          className="w-full mb-4"
          data-testid="button-import-contacts"
        >
          + Import from Contacts
        </Button>

        {/* Search */}
        <Input
          type="text"
          placeholder="Search guests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-6"
          data-testid="input-search-guests"
        />

        {/* Developer Note */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-semibold mb-1">Developer Note</p>
              <p>This page will include functionality to override and review RSVPs. Hosts will be able to manually update guest responses, view detailed RSVP history, and manage attendance confirmations.</p>
            </div>
          </div>
        </div>

        {/* Attending Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Attending (35)</h3>
          <div className="space-y-3">
            {attendingGuests.map((guest) => (
              <div
                key={guest.id}
                className="bg-card rounded-lg p-4 border border-card-border"
                data-testid={`guest-${guest.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base">{guest.name}</span>
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Yes</span>
                      </span>
                    </div>
                    {guest.note && (
                      <p className="text-sm text-muted-foreground mt-1">{guest.note}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maybe Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Maybe (5)</h3>
          <div className="space-y-3">
            {maybeGuests.map((guest) => (
              <div
                key={guest.id}
                className="bg-card rounded-lg p-4 border border-card-border"
                data-testid={`guest-${guest.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base">{guest.name}</span>
                      <span className="text-amber-600 flex items-center gap-1">
                        <span className="text-sm">? Maybe</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Not Yet Responded Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Not Yet Responded (10)</h3>
          <div className="space-y-3">
            {pendingGuests.map((guest) => (
              <div
                key={guest.id}
                className="bg-card rounded-lg p-4 border border-card-border"
                data-testid={`guest-${guest.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base">{guest.name}</span>
                      <span className="text-muted-foreground text-sm">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
