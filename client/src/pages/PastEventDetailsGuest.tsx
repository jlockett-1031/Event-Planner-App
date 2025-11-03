import { useState, useEffect } from "react";
import { ArrowLeft, Music, Camera, Upload, Download, Share2, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiSpotify, SiApplemusic, SiSoundcloud } from "react-icons/si";

interface PastEventDetailsGuestProps {
  eventId: string;
  onBack?: () => void;
}

interface Song {
  title: string;
  artist: string;
}

interface Photo {
  id: string;
  url: string;
  uploadedBy: string;
}

// Per-event photo storage (simulates different events having different photos)
const photosByEvent: Record<string, Photo[]> = {
  "7": [
    { id: "7-1", url: "gradient-1", uploadedBy: "Sarah M." },
    { id: "7-2", url: "gradient-2", uploadedBy: "Alex J." },
    { id: "7-3", url: "gradient-3", uploadedBy: "Mike T." },
    { id: "7-4", url: "gradient-4", uploadedBy: "Jennifer L." },
    { id: "7-5", url: "gradient-5", uploadedBy: "David K." },
    { id: "7-6", url: "gradient-6", uploadedBy: "Maria S." },
  ],
  "8": [
    { id: "8-1", url: "gradient-1", uploadedBy: "Emma W." },
    { id: "8-2", url: "gradient-2", uploadedBy: "Lucas B." },
    { id: "8-3", url: "gradient-3", uploadedBy: "Olivia R." },
    { id: "8-4", url: "gradient-4", uploadedBy: "Noah P." },
    { id: "8-5", url: "gradient-5", uploadedBy: "Ava C." },
    { id: "8-6", url: "gradient-6", uploadedBy: "Liam H." },
  ],
};

export default function PastEventDetailsGuest({ eventId, onBack }: PastEventDetailsGuestProps) {
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Initialize photos when eventId changes
  useEffect(() => {
    const eventPhotos = photosByEvent[eventId] || [];
    setPhotos(eventPhotos);
  }, [eventId]);

  // Mock data based on eventId
  const isSummerBBQ = eventId === "7";

  const eventData = isSummerBBQ
    ? {
        name: "Summer BBQ Bash",
        date: "August 12, 2025",
        location: "Central Park Pavilion",
        attendees: 42,
        hostedBy: "Sarah & Maria",
        allowPhotoDownload: true,
        photoCount: 47,
      }
    : {
        name: "Spring Garden Party",
        date: "May 20, 2025",
        location: "Rose Garden Estate",
        attendees: 28,
        hostedBy: "Jennifer & Mike",
        allowPhotoDownload: false,
        photoCount: 35,
      };

  const playlist: Song[] = [
    { title: "Good Days", artist: "SZA" },
    { title: "Levitating", artist: "Dua Lipa" },
    { title: "Heat Waves", artist: "Glass Animals" },
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Save Your Tears", artist: "The Weeknd" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploadingPhoto(true);
      
      // Convert uploaded files to photo objects
      const newPhotos: Photo[] = Array.from(files).map((file, index) => ({
        id: `${eventId}-uploaded-${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        uploadedBy: "You",
      }));
      
      // Simulate upload delay
      setTimeout(() => {
        setPhotos((prevPhotos) => [...newPhotos, ...prevPhotos]);
        // Update the per-event storage
        photosByEvent[eventId] = [...newPhotos, ...photosByEvent[eventId]];
        setIsUploadingPhoto(false);
        e.target.value = ""; // Clear input
      }, 1500);
    }
  };

  const handleExportSpotify = () => {
    alert("Export to Spotify - Integration will be implemented");
  };

  const handleExportAppleMusic = () => {
    alert("Export to Apple Music - Integration will be implemented");
  };

  const handleExportSoundCloud = () => {
    alert("Export to SoundCloud - Integration will be implemented");
  };

  const handleDownloadAlbum = () => {
    alert("Downloading photo album...");
  };

  const handleShareLink = () => {
    alert("Album link copied to clipboard!");
  };

  const handleViewAllPhotos = () => {
    alert("Opening photo gallery...");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-1">{eventData.name}</h1>
          <p className="text-center text-white/90">{eventData.date}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary mb-6 hover:text-primary/80 transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Past Events
        </button>

        <div className="space-y-6">
          {/* Music Recap */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Music Recap</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              {playlist.length + 18} songs were played at this party
            </p>

            <div className="space-y-3 mb-4">
              {playlist.map((song, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-4 border border-card-border"
                  data-testid={`song-${index}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold">{song.title}</div>
                      <div className="text-sm text-muted-foreground">{song.artist}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button className="text-xs text-primary hover:underline">
                        Follow Artist
                      </button>
                      <button className="text-xs text-primary hover:underline">
                        Add to My Playlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center text-sm text-muted-foreground py-2">
                + 18 more songs
              </div>
            </div>

            {/* Export Buttons */}
            <div className="space-y-3">
              <Button
                variant="default"
                className="w-full"
                onClick={handleExportSpotify}
                data-testid="button-export-spotify"
              >
                <SiSpotify className="w-4 h-4 mr-2" />
                Export Full Playlist to Spotify
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleExportAppleMusic}
                data-testid="button-export-apple-music"
              >
                <SiApplemusic className="w-4 h-4 mr-2" />
                Export to Apple Music
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleExportSoundCloud}
                data-testid="button-export-soundcloud"
              >
                <SiSoundcloud className="w-4 h-4 mr-2" />
                Export to SoundCloud
              </Button>
            </div>
          </div>

          {/* Photo Album */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Photo Album</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              {eventData.photoCount} photos from the party
            </p>

            {/* Photo Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {photos.slice(0, 6).map((photo, i) => (
                <div
                  key={photo.id}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                  data-testid={`photo-${i}`}
                >
                  {photo.url.startsWith("gradient-") ? (
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          photo.url === "gradient-1"
                            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                            : photo.url === "gradient-2"
                            ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                            : photo.url === "gradient-3"
                            ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                            : photo.url === "gradient-4"
                            ? "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
                            : photo.url === "gradient-5"
                            ? "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
                            : "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
                      }}
                    />
                  ) : (
                    <img
                      src={photo.url}
                      alt="Event photo"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo.uploadedBy}
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Photo Button */}
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
                data-testid="input-photo-upload"
              />
              <label htmlFor="photo-upload">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isUploadingPhoto}
                  asChild
                >
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploadingPhoto ? "Uploading..." : "Upload Your Photos"}
                  </span>
                </Button>
              </label>
            </div>

            {/* Album Actions */}
            <div className="space-y-3">
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleViewAllPhotos}
                data-testid="button-view-all-photos"
              >
                <Camera className="w-4 h-4 mr-2" />
                View All Photos
              </Button>

              {eventData.allowPhotoDownload && (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleDownloadAlbum}
                  data-testid="button-download-album"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Album
                </Button>
              )}

              {!eventData.allowPhotoDownload && (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleShareLink}
                  data-testid="button-share-link"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Album Link
                </Button>
              )}
            </div>
          </div>

          {/* Event Details */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Event Details</h2>
            <div className="bg-card rounded-xl p-6 border border-card-border space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{eventData.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Attendees</span>
                <span className="font-medium">{eventData.attendees} people</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hosted By</span>
                <span className="font-medium">{eventData.hostedBy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
