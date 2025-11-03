import { useState } from "react";
import { ArrowLeft, Send, Megaphone, Bell, MessageCircle, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface CommunicationToolsProps {
  onBack?: () => void;
}

export default function CommunicationTools({ onBack }: CommunicationToolsProps) {
  const [announcement, setAnnouncement] = useState("");
  const [reminder, setReminder] = useState("");
  const [selectedGuest, setSelectedGuest] = useState("");
  const [individualMessage, setIndividualMessage] = useState("");

  const handleSendAnnouncement = () => {
    if (announcement) {
      console.log("Sending announcement:", announcement);
      alert("Announcement sent to all guests!");
      setAnnouncement("");
    }
  };

  const handleSendReminder = () => {
    console.log("Sending reminder:", reminder);
    alert("Reminder sent to all guests!");
    setReminder("");
  };

  const handleSendIndividualMessage = () => {
    if (selectedGuest && individualMessage) {
      console.log("Sending message to:", selectedGuest, individualMessage);
      alert(`Message sent to ${selectedGuest}!`);
      setIndividualMessage("");
    }
  };

  const messageHistory = [
    {
      id: "1",
      type: "Announcement",
      message: "Reminder: Please bring your potluck items by 8:30 PM",
      timestamp: "2 hours ago",
      recipients: "All Guests (42)",
    },
    {
      id: "2",
      type: "Reminder",
      message: "Don't forget to RSVP by December 10th!",
      timestamp: "1 day ago",
      recipients: "All Guests (42)",
    },
    {
      id: "3",
      type: "Individual",
      message: "Thanks for confirming! See you there.",
      timestamp: "2 days ago",
      recipients: "Sarah Martinez",
    },
    {
      id: "4",
      type: "Announcement",
      message: "We'll have a champagne toast at midnight!",
      timestamp: "3 days ago",
      recipients: "All Guests (42)",
    },
  ];

  const guests = [
    "Sarah Martinez",
    "Alex Johnson",
    "Mike Chen",
    "Emily Davis",
    "Chris Wilson",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Communication Tools</h1>
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

        <Tabs defaultValue="announcement" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="announcement" data-testid="tab-announcement">
              <Megaphone className="w-4 h-4 mr-2" />
              Announcement
            </TabsTrigger>
            <TabsTrigger value="reminder" data-testid="tab-reminder">
              <Bell className="w-4 h-4 mr-2" />
              Reminder
            </TabsTrigger>
            <TabsTrigger value="individual" data-testid="tab-individual">
              <MessageCircle className="w-4 h-4 mr-2" />
              Individual
            </TabsTrigger>
            <TabsTrigger value="history" data-testid="tab-history">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Send Announcement */}
          <TabsContent value="announcement" className="space-y-4">
            <div className="bg-card rounded-xl p-6 border border-card-border">
              <div className="flex items-center gap-2 mb-4">
                <Megaphone className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Send Announcement to All Guests</h2>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Send an important update or announcement to all guests. This will appear in their event details page.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="announcement">Your Message</Label>
                  <Textarea
                    id="announcement"
                    placeholder="e.g., Parking is available in the underground lot. Just tell the attendant you're here for the party."
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="min-h-32"
                    data-testid="textarea-announcement"
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleSendAnnouncement}
                  disabled={!announcement}
                  data-testid="button-send-announcement"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Announcement to All Guests
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Send Reminder */}
          <TabsContent value="reminder" className="space-y-4">
            <div className="bg-card rounded-xl p-6 border border-card-border">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Send Reminder Notification</h2>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Send a reminder to all guests. Great for RSVP deadlines, what to bring, or event day reminders.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reminder">Reminder Message</Label>
                  <Textarea
                    id="reminder"
                    placeholder="e.g., Don't forget to RSVP by December 10th!"
                    value={reminder}
                    onChange={(e) => setReminder(e.target.value)}
                    className="min-h-32"
                    data-testid="textarea-reminder"
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleSendReminder}
                  disabled={!reminder}
                  data-testid="button-send-reminder"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Send Reminder to All Guests
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Message Individual Guest */}
          <TabsContent value="individual" className="space-y-4">
            <div className="bg-card rounded-xl p-6 border border-card-border">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Message Individual Guest</h2>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Send a private message to a specific guest.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Guest</Label>
                  <div className="space-y-2">
                    {guests.map((guest) => (
                      <button
                        key={guest}
                        onClick={() => setSelectedGuest(guest)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedGuest === guest
                            ? "bg-primary/10 border-primary"
                            : "bg-card border-card-border hover-elevate"
                        }`}
                        data-testid={`button-select-${guest.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {guest}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedGuest && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="individualMessage">Message to {selectedGuest}</Label>
                      <Textarea
                        id="individualMessage"
                        placeholder="Type your message..."
                        value={individualMessage}
                        onChange={(e) => setIndividualMessage(e.target.value)}
                        className="min-h-24"
                        data-testid="textarea-individual-message"
                      />
                    </div>

                    <Button
                      className="w-full"
                      onClick={handleSendIndividualMessage}
                      disabled={!individualMessage}
                      data-testid="button-send-individual-message"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message to {selectedGuest}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Message History */}
          <TabsContent value="history" className="space-y-4">
            <div className="bg-card rounded-xl p-6 border border-card-border">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Message History</h2>
              </div>
              
              <div className="space-y-3">
                {messageHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 bg-muted/50 rounded-lg border border-border"
                    data-testid={`message-${msg.id}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{msg.type}</Badge>
                        <span className="text-sm text-muted-foreground">{msg.recipients}</span>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
