import { ArrowLeft, Download, FileText, TrendingUp, Calendar, Users, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AnalyticsReportsProps {
  onBack?: () => void;
}

export default function AnalyticsReports({ onBack }: AnalyticsReportsProps) {
  const handleDownloadGuestListCSV = () => {
    console.log("Downloading guest list as CSV");
    alert("Downloading guest list as CSV...");
  };

  const handleDownloadGuestListPDF = () => {
    console.log("Downloading guest list as PDF");
    alert("Downloading guest list as PDF...");
  };

  const handleExportEventSummary = () => {
    console.log("Exporting event summary");
    alert("Downloading event summary...");
  };

  const rsvpTimeline = [
    { date: "Dec 1", yes: 12, maybe: 2, no: 3 },
    { date: "Dec 3", yes: 18, maybe: 3, no: 5 },
    { date: "Dec 5", yes: 25, maybe: 4, no: 7 },
    { date: "Dec 7", yes: 30, maybe: 4, no: 8 },
    { date: "Dec 9", yes: 35, maybe: 5, no: 10 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Analytics & Reports</h1>
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
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 border border-card-border text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">50</div>
              <div className="text-sm text-muted-foreground">Total Invited</div>
            </div>
            <div className="bg-card rounded-xl p-4 border border-card-border text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">35</div>
              <div className="text-sm text-muted-foreground">Accepted</div>
            </div>
            <div className="bg-card rounded-xl p-4 border border-card-border text-center">
              <XCircle className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">10</div>
              <div className="text-sm text-muted-foreground">Declined</div>
            </div>
            <div className="bg-card rounded-xl p-4 border border-card-border text-center">
              <HelpCircle className="w-6 h-6 mx-auto mb-2 text-amber-500" />
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">5</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </div>

          {/* Download Guest List */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <Download className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Download Guest List</h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Export your complete guest list with RSVP status, contact information, and dietary restrictions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="secondary"
                onClick={handleDownloadGuestListCSV}
                data-testid="button-download-csv"
              >
                <FileText className="w-4 h-4 mr-2" />
                Download as CSV
              </Button>
              <Button
                variant="secondary"
                onClick={handleDownloadGuestListPDF}
                data-testid="button-download-pdf"
              >
                <FileText className="w-4 h-4 mr-2" />
                Download as PDF
              </Button>
            </div>
          </div>

          {/* Export Event Summary */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Export Event Summary</h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Download a comprehensive report including event details, guest list, menu, and all activities.
            </p>

            <Button
              variant="secondary"
              className="w-full"
              onClick={handleExportEventSummary}
              data-testid="button-export-summary"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Event Summary (PDF)
            </Button>
          </div>

          {/* RSVP Timeline */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">RSVP Response Timeline</h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              Track how your guest responses have changed over time.
            </p>

            <div className="space-y-3">
              {rsvpTimeline.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
                  data-testid={`timeline-${index}`}
                >
                  <div className="flex items-center gap-2 min-w-24">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">{entry.date}</span>
                  </div>
                  
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {entry.yes} Yes
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <HelpCircle className="w-3 h-3 mr-1" />
                        {entry.maybe} Maybe
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30">
                        <XCircle className="w-3 h-3 mr-1" />
                        {entry.no} No
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground min-w-24 text-right">
                    {entry.yes + entry.maybe + entry.no} total
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                70% acceptance rate • 5 guests haven't responded yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
