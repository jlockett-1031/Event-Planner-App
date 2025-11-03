import { useState } from "react";
import { ArrowLeft, Calendar, XCircle, Copy, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EventManagementProps {
  onBack?: () => void;
}

export default function EventManagement({ onBack }: EventManagementProps) {
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [duplicateEventName, setDuplicateEventName] = useState("Sarah's Graduation Party (Copy)");

  const handleReschedule = () => {
    if (rescheduleDate && rescheduleTime) {
      console.log("Rescheduling to:", rescheduleDate, rescheduleTime);
      alert(`Event rescheduled to ${rescheduleDate} at ${rescheduleTime}. All guests will be notified.`);
      setRescheduleDate("");
      setRescheduleTime("");
    }
  };

  const handleCancelEvent = () => {
    console.log("Canceling event with reason:", cancelReason);
    alert("Event has been canceled. All guests have been notified.");
    setCancelReason("");
  };

  const handleDuplicateEvent = () => {
    console.log("Duplicating event as:", duplicateEventName);
    alert(`Event duplicated as "${duplicateEventName}". You can now edit the new event.`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Event Management</h1>
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
          {/* Reschedule Event */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Reschedule Event</h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Change the date and time of your event. All guests will receive a notification about the change.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rescheduleDate">New Date</Label>
                  <Input
                    id="rescheduleDate"
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    data-testid="input-reschedule-date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rescheduleTime">New Time</Label>
                  <Input
                    id="rescheduleTime"
                    type="time"
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    data-testid="input-reschedule-time"
                  />
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Current event date: December 15, 2025 at 4:00 PM
                </p>
              </div>

              <Button
                className="w-full"
                onClick={handleReschedule}
                disabled={!rescheduleDate || !rescheduleTime}
                data-testid="button-reschedule"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Reschedule Event & Notify Guests
              </Button>
            </div>
          </div>

          {/* Duplicate Event */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <Copy className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Duplicate Event</h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Create a copy of this event. Perfect for recurring gatherings like monthly dinners or annual celebrations.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="duplicateEventName">New Event Name</Label>
                <Input
                  id="duplicateEventName"
                  value={duplicateEventName}
                  onChange={(e) => setDuplicateEventName(e.target.value)}
                  placeholder="e.g., Sarah's Graduation Party 2026"
                  data-testid="input-duplicate-name"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  The new event will copy all settings, guest list, and menu details. You can edit these after duplication.
                </p>
              </div>

              <Button
                className="w-full"
                variant="secondary"
                onClick={handleDuplicateEvent}
                disabled={!duplicateEventName}
                data-testid="button-duplicate"
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicate Event
              </Button>
            </div>
          </div>

          {/* Cancel Event */}
          <div className="bg-card rounded-xl p-6 border border-destructive">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-destructive" />
              <h2 className="text-xl font-bold text-destructive">Cancel Event</h2>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900 dark:text-amber-100">
                  <p className="font-semibold mb-1">Warning: This action cannot be undone.</p>
                  <p>Canceling this event will notify all guests and permanently archive the event.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cancelReason">Reason for Cancellation (Optional)</Label>
                <Textarea
                  id="cancelReason"
                  placeholder="e.g., Due to unforeseen circumstances, we need to cancel the event..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="min-h-24"
                  data-testid="textarea-cancel-reason"
                />
                <p className="text-sm text-muted-foreground">
                  This message will be sent to all guests.
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full"
                    variant="destructive"
                    data-testid="button-cancel-event"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Event
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently cancel the event and notify all 50 guests. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-testid="button-cancel-dialog-cancel">
                      Keep Event
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancelEvent}
                      className="bg-destructive hover:bg-destructive/90"
                      data-testid="button-cancel-dialog-confirm"
                    >
                      Yes, Cancel Event
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
