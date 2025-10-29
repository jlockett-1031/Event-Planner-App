interface RSVPStatsProps {
  yesCount: number;
  maybeCount: number;
  noCount: number;
}

export default function RSVPStats({ yesCount, maybeCount, noCount }: RSVPStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 p-6 bg-card rounded-xl">
      <div className="text-center" data-testid="rsvp-yes">
        <div className="text-3xl font-bold text-primary">{yesCount}</div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
          Yes
        </div>
      </div>
      <div className="text-center" data-testid="rsvp-maybe">
        <div className="text-3xl font-bold text-primary">{maybeCount}</div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
          Maybe
        </div>
      </div>
      <div className="text-center" data-testid="rsvp-no">
        <div className="text-3xl font-bold text-primary">{noCount}</div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
          No
        </div>
      </div>
    </div>
  );
}
