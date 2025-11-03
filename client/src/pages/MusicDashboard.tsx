import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface MusicDashboardProps {
  onBack?: () => void;
}

export default function MusicDashboard({ onBack }: MusicDashboardProps) {
  const [activeTab, setActiveTab] = useState("pre-event");
  const [vibe, setVibe] = useState("upbeat");
  const [genrePreferences, setGenrePreferences] = useState("");

  const currentPlaylist = [
    { id: "1", title: "Good Days", artist: "SZA" },
    { id: "2", title: "Levitating", artist: "Dua Lipa" },
    { id: "3", title: "Heat Waves", artist: "Glass Animals" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Music Dashboard</h1>
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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pre-event" data-testid="tab-pre-event">
              Pre-Event
            </TabsTrigger>
            <TabsTrigger value="live-tracking" data-testid="tab-live-tracking">
              Live Tracking
            </TabsTrigger>
            <TabsTrigger value="recap" data-testid="tab-recap">
              Recap
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pre-event" className="mt-6 space-y-6">
            {/* AI Playlist Generator */}
            <div>
              <h2 className="text-xl font-bold mb-2">AI Playlist Generator</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Create the perfect vibe for your party
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Vibe</label>
                  <Select value={vibe} onValueChange={setVibe}>
                    <SelectTrigger data-testid="select-vibe">
                      <SelectValue placeholder="Select a vibe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upbeat" data-testid="select-vibe-upbeat">Upbeat & Energetic</SelectItem>
                      <SelectItem value="chill" data-testid="select-vibe-chill">Chill & Relaxed</SelectItem>
                      <SelectItem value="party" data-testid="select-vibe-party">Party & Dance</SelectItem>
                      <SelectItem value="classy" data-testid="select-vibe-classy">Classy & Elegant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Genre Preferences</label>
                  <Input
                    type="text"
                    placeholder="e.g., Pop, Hip-Hop, R&B"
                    value={genrePreferences}
                    onChange={(e) => setGenrePreferences(e.target.value)}
                    data-testid="input-genre-preferences"
                  />
                </div>

                <Button className="w-full" data-testid="button-generate-playlist">
                  Generate Playlist with AI
                </Button>
              </div>
            </div>

            {/* Collaborative Playlist */}
            <div>
              <h2 className="text-xl font-bold mb-2">Collaborative Playlist</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Let guests suggest songs before the party
              </p>

              <Button 
                variant="secondary" 
                className="w-full"
                data-testid="button-enable-guest-contributions"
              >
                Enable Guest Contributions
              </Button>
            </div>

            {/* Current Playlist */}
            <div>
              <h2 className="text-xl font-bold mb-4">Current Playlist (23 songs)</h2>

              <div className="space-y-3 mb-4">
                {currentPlaylist.map((song) => (
                  <div
                    key={song.id}
                    className="p-4 bg-card rounded-lg border border-card-border"
                    data-testid={`song-${song.id}`}
                  >
                    <div className="font-semibold">{song.title}</div>
                    <div className="text-sm text-muted-foreground">- {song.artist}</div>
                  </div>
                ))}
              </div>

              <Button 
                variant="secondary" 
                className="w-full"
                data-testid="button-export-spotify"
              >
                Export to Spotify
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="live-tracking" className="mt-6">
            <div className="bg-card rounded-xl p-6 text-center">
              <p className="text-muted-foreground">Live tracking features will appear here during the event</p>
            </div>
          </TabsContent>

          <TabsContent value="recap" className="mt-6">
            <div className="bg-card rounded-xl p-6 text-center">
              <p className="text-muted-foreground">Event recap and analytics will appear here after the event</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
