import { useState } from "react";
import { ArrowLeft, Users, Mail, Crown, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ManageHostTeamProps {
  onBack?: () => void;
}

interface HostMember {
  id: string;
  name: string;
  email: string;
  role: "primary-host" | "co-host";
}

export default function ManageHostTeam({ onBack }: ManageHostTeamProps) {
  const [hostTeam, setHostTeam] = useState<HostMember[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      role: "primary-host",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.c@email.com",
      role: "co-host",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      role: "co-host",
    },
  ]);

  const [newHostEmail, setNewHostEmail] = useState("");
  const [isAddingHost, setIsAddingHost] = useState(false);

  const handleAddHost = () => {
    if (!newHostEmail.trim()) return;
    
    const newHost: HostMember = {
      id: Date.now().toString(),
      name: "Pending...",
      email: newHostEmail,
      role: "co-host",
    };
    
    setHostTeam([...hostTeam, newHost]);
    setNewHostEmail("");
    setIsAddingHost(false);
  };

  const handleRemoveHost = (id: string) => {
    setHostTeam(hostTeam.filter(h => h.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Manage Host Team</h1>
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
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 dark:text-blue-100">
              Co-hosts can help manage the event, edit details, and communicate with guests. The primary host has full control over all settings.
            </p>
          </div>

          {/* Host Team List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Host Team ({hostTeam.length})</h2>
            <div className="space-y-3">
              {hostTeam.map((host) => (
                <div
                  key={host.id}
                  className="bg-card rounded-lg p-4 border border-card-border"
                  data-testid={`host-${host.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-base">{host.name}</span>
                        {host.role === "primary-host" && (
                          <Badge variant="default" className="text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Primary Host
                          </Badge>
                        )}
                        {host.role === "co-host" && (
                          <Badge variant="secondary" className="text-xs">
                            Co-Host
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {host.email}
                      </div>
                    </div>
                    {host.role !== "primary-host" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveHost(host.id)}
                        data-testid={`button-remove-host-${host.id}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Co-Host Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Add Co-Host</h2>
            {!isAddingHost ? (
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setIsAddingHost(true)}
                data-testid="button-add-co-host"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Co-Host
              </Button>
            ) : (
              <div className="bg-card rounded-lg p-4 border border-card-border space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="co-host-email">Co-Host Email Address</Label>
                  <Input
                    id="co-host-email"
                    type="email"
                    placeholder="e.g., john.doe@email.com"
                    value={newHostEmail}
                    onChange={(e) => setNewHostEmail(e.target.value)}
                    data-testid="input-co-host-email"
                  />
                  <p className="text-xs text-muted-foreground">
                    They'll receive an invitation to join as a co-host
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddHost}
                    className="flex-1"
                    data-testid="button-send-invitation"
                  >
                    Send Invitation
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsAddingHost(false);
                      setNewHostEmail("");
                    }}
                    data-testid="button-cancel-add"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Permissions Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Co-Host Permissions</h2>
            <div className="bg-card rounded-lg p-4 border border-card-border">
              <p className="text-sm mb-3 font-medium">Co-hosts can:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>View and manage the guest list</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Edit event details and description</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Manage food menu and potluck items</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Send messages and updates to guests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Manage music playlist and photo albums</span>
                </li>
              </ul>
              <p className="text-sm mt-3 font-medium">Co-hosts cannot:</p>
              <ul className="space-y-2 text-sm text-muted-foreground mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Delete the event</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Remove the primary host</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Transfer primary host status</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
