import { useState } from "react";
import { ArrowLeft, Music, Play, SkipForward, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

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

              <div className="space-y-3">
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
            </div>

            {/* Music Service Connections */}
            <div className="pt-6 border-t border-border">
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="secondary" 
                  className="w-full"
                  data-testid="button-connect-apple-music"
                >
                  Connect to Apple Music
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  data-testid="button-connect-spotify"
                >
                  Connect to Spotify
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  data-testid="button-connect-soundcloud"
                >
                  Connect to SoundCloud
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="live-tracking" className="mt-6 space-y-6">
            {/* Now Playing */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/20" data-testid="now-playing-section">
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Now Playing</h3>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Music className="w-12 h-12 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold truncate" data-testid="text-now-playing-title">Levitating</h2>
                  <p className="text-lg text-muted-foreground" data-testid="text-now-playing-artist">Dua Lipa</p>
                  
                  <div className="mt-4 space-y-2">
                    <Progress value={65} className="h-2" data-testid="progress-now-playing" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span data-testid="text-current-time">2:15</span>
                      <span data-testid="text-total-time">3:28</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 border border-card-border text-center">
                <div className="text-3xl font-bold text-primary" data-testid="stat-songs-played">12</div>
                <div className="text-sm text-muted-foreground mt-1">Songs Played</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-card-border text-center">
                <div className="text-3xl font-bold text-primary" data-testid="stat-time-elapsed">2h 15m</div>
                <div className="text-sm text-muted-foreground mt-1">Time Elapsed</div>
              </div>
            </div>

            {/* Up Next */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <SkipForward className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Up Next</h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-card rounded-lg p-4 border border-card-border flex items-center gap-4" data-testid="queue-item-1">
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    <Music className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">Good Days</div>
                    <div className="text-sm text-muted-foreground">SZA</div>
                  </div>
                  <div className="text-sm text-muted-foreground">4:39</div>
                </div>

                <div className="bg-card rounded-lg p-4 border border-card-border flex items-center gap-4" data-testid="queue-item-2">
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    <Music className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">Heat Waves</div>
                    <div className="text-sm text-muted-foreground">Glass Animals</div>
                  </div>
                  <div className="text-sm text-muted-foreground">3:58</div>
                </div>

                <div className="bg-card rounded-lg p-4 border border-card-border flex items-center gap-4" data-testid="queue-item-3">
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    <Music className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">Blinding Lights</div>
                    <div className="text-sm text-muted-foreground">The Weeknd</div>
                  </div>
                  <div className="text-sm text-muted-foreground">3:20</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recap" className="mt-6 space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4 border border-card-border text-center">
                <div className="text-3xl font-bold text-primary" data-testid="recap-stat-total-songs">23</div>
                <div className="text-sm text-muted-foreground mt-1">Total Songs</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-card-border text-center">
                <div className="text-3xl font-bold text-primary" data-testid="recap-stat-total-duration">4h 32m</div>
                <div className="text-sm text-muted-foreground mt-1">Total Duration</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-card-border text-center">
                <div className="text-3xl font-bold text-primary" data-testid="recap-stat-total-artists">18</div>
                <div className="text-sm text-muted-foreground mt-1">Artists</div>
              </div>
            </div>

            {/* Top Songs */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Top Songs</h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-card rounded-lg p-4 border border-card-border flex items-center gap-4" data-testid="top-song-1">
                  <div className="text-2xl font-bold text-primary w-8 text-center flex-shrink-0">1</div>
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                    <Music className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">Levitating</div>
                    <div className="text-sm text-muted-foreground">Dua Lipa</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Played 3 times</div>
                </div>

                <div className="bg-card rounded-lg p-4 border border-card-border flex items-center gap-4" data-testid="top-song-2">
                  <div className="text-2xl font-bold text-primary w-8 text-center flex-shrink-0">2</div>
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                    <Music className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">Good Days</div>
                    <div className="text-sm text-muted-foreground">SZA</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Played 2 times</div>
                </div>

                <div className="bg-card rounded-lg p-4 border border-card-border flex items-center gap-4" data-testid="top-song-3">
                  <div className="text-2xl font-bold text-primary w-8 text-center flex-shrink-0">3</div>
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                    <Music className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">Heat Waves</div>
                    <div className="text-sm text-muted-foreground">Glass Animals</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Played 2 times</div>
                </div>
              </div>
            </div>

            {/* Full Playback History */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Playback History</h3>
              </div>
              
              <div className="space-y-2">
                <div className="bg-card rounded-lg p-3 border border-card-border flex items-center gap-3" data-testid="history-entry-1">
                  <div className="text-sm text-muted-foreground w-16 flex-shrink-0">11:45 PM</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">Blinding Lights</div>
                    <div className="text-xs text-muted-foreground">The Weeknd</div>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-3 border border-card-border flex items-center gap-3" data-testid="history-entry-2">
                  <div className="text-sm text-muted-foreground w-16 flex-shrink-0">11:42 PM</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">Levitating</div>
                    <div className="text-xs text-muted-foreground">Dua Lipa</div>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-3 border border-card-border flex items-center gap-3" data-testid="history-entry-3">
                  <div className="text-sm text-muted-foreground w-16 flex-shrink-0">11:38 PM</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">Good Days</div>
                    <div className="text-xs text-muted-foreground">SZA</div>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-3 border border-card-border flex items-center gap-3" data-testid="history-entry-4">
                  <div className="text-sm text-muted-foreground w-16 flex-shrink-0">11:34 PM</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">Heat Waves</div>
                    <div className="text-xs text-muted-foreground">Glass Animals</div>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-3 border border-card-border flex items-center gap-3" data-testid="history-entry-5">
                  <div className="text-sm text-muted-foreground w-16 flex-shrink-0">11:30 PM</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">As It Was</div>
                    <div className="text-xs text-muted-foreground">Harry Styles</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Actions */}
            <div className="pt-4 border-t border-border">
              <Button variant="secondary" className="w-full" data-testid="button-download-recap">
                Download Event Recap
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
