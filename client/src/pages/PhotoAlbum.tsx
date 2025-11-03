import { useState } from "react";
import { ArrowLeft, Camera, Link as LinkIcon, Upload, Info, Share2, Eye, EyeOff, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PhotoAlbumProps {
  onBack?: () => void;
}

export default function PhotoAlbum({ onBack }: PhotoAlbumProps) {
  const [allowGuestUploads, setAllowGuestUploads] = useState(true);
  const [requireApproval, setRequireApproval] = useState(true);
  const [allowDownloads, setAllowDownloads] = useState(true);
  const [showInGallery, setShowInGallery] = useState(true);
  const [activeTab, setActiveTab] = useState("settings");

  const handleRequireApprovalChange = (checked: boolean) => {
    setRequireApproval(checked);
    // If turning off approval and user is on pending tab, switch to settings
    if (!checked && activeTab === "pending") {
      setActiveTab("settings");
    }
  };

  const shareLink = "https://hostaparty.com/album/sarah-graduation-2025";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Photo Album</h1>
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
          <TabsList className={`grid w-full ${requireApproval ? 'grid-cols-3' : 'grid-cols-2'}`}>
            <TabsTrigger value="settings" data-testid="tab-settings">
              Settings
            </TabsTrigger>
            <TabsTrigger value="photos" data-testid="tab-photos">
              Photos (0)
            </TabsTrigger>
            {requireApproval && (
              <TabsTrigger value="pending" data-testid="tab-pending">
                Pending Approval (0)
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="settings" className="mt-6 space-y-6">
            {/* Info Banner */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900 dark:text-blue-100">
                Create a shared photo album for your event. Guests can upload photos before, during, and after the party.
              </p>
            </div>

            {/* Share Link */}
            <div>
              <h2 className="text-xl font-bold mb-4">Share Album Link</h2>
              <div className="bg-card rounded-lg p-4 border border-card-border space-y-3">
                <p className="text-sm text-muted-foreground">
                  Share this link with guests so they can view and upload photos
                </p>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={shareLink}
                    readOnly
                    data-testid="input-share-link"
                    className="flex-1"
                  />
                  <Button
                    variant="secondary"
                    onClick={handleCopyLink}
                    data-testid="button-copy-link"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
                <Button
                  variant="secondary"
                  className="w-full"
                  data-testid="button-share-link"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Link via Email/SMS
                </Button>
              </div>
            </div>

            {/* Upload Settings */}
            <div>
              <h2 className="text-xl font-bold mb-4">Upload Settings</h2>
              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                  <div className="flex-1">
                    <div className="font-semibold">Allow guest uploads</div>
                    <p className="text-sm text-muted-foreground">
                      Let guests upload their own photos to the album
                    </p>
                  </div>
                  <Switch
                    checked={allowGuestUploads}
                    onCheckedChange={setAllowGuestUploads}
                    data-testid="switch-allow-guest-uploads"
                  />
                </div>

                <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                  <div className="flex-1">
                    <div className="font-semibold">Require photo approval</div>
                    <p className="text-sm text-muted-foreground">
                      Review and approve guest photos before they appear in the album
                    </p>
                  </div>
                  <Switch
                    checked={requireApproval}
                    onCheckedChange={handleRequireApprovalChange}
                    data-testid="switch-require-approval"
                  />
                </div>

                <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                  <div className="flex-1">
                    <div className="font-semibold">Allow photo downloads</div>
                    <p className="text-sm text-muted-foreground">
                      Let guests download photos from the album
                    </p>
                  </div>
                  <Switch
                    checked={allowDownloads}
                    onCheckedChange={setAllowDownloads}
                    data-testid="switch-allow-downloads"
                  />
                </div>

                <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-card-border">
                  <div className="flex-1">
                    <div className="font-semibold">Show album in event gallery</div>
                    <p className="text-sm text-muted-foreground">
                      Display photos in a public gallery on the event page
                    </p>
                  </div>
                  <Switch
                    checked={showInGallery}
                    onCheckedChange={setShowInGallery}
                    data-testid="switch-show-in-gallery"
                  />
                </div>
              </div>
            </div>

            {/* Storage Info */}
            <div>
              <h2 className="text-xl font-bold mb-4">Storage</h2>
              <div className="bg-card rounded-lg p-4 border border-card-border space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Photos uploaded</span>
                  <span className="text-sm font-medium">0 photos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Storage used</span>
                  <span className="text-sm font-medium">0 MB / 2 GB</span>
                </div>
              </div>
            </div>

            {/* Host Upload */}
            <div>
              <h2 className="text-xl font-bold mb-4">Upload Photos</h2>
              <div className="bg-card rounded-lg p-8 border-2 border-dashed border-border text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Drag and drop photos here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
                <Button data-testid="button-upload-photos">
                  <Camera className="w-4 h-4 mr-2" />
                  Select Photos
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="mt-6">
            <div className="bg-card rounded-xl p-8 text-center border-2 border-dashed border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium mb-2">No photos yet</p>
              <p className="text-sm text-muted-foreground mb-4">
                Upload photos or share the album link with guests
              </p>
              <Button data-testid="button-upload-first-photo">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photos
              </Button>
            </div>
          </TabsContent>

          {requireApproval && (
            <TabsContent value="pending" className="mt-6">
              <div className="bg-card rounded-xl p-8 text-center border-2 border-dashed border-border">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium mb-2">No photos pending approval</p>
                <p className="text-sm text-muted-foreground">
                  Guest photos will appear here when approval is required
                </p>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
