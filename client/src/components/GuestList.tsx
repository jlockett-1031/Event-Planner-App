import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface Guest {
  id: string;
  name: string;
  rsvp: "yes" | "no" | "maybe" | "pending";
}

interface GuestListProps {
  guests: Guest[];
}

export default function GuestList({ guests }: GuestListProps) {
  const getBadgeVariant = (rsvp: Guest["rsvp"]) => {
    switch (rsvp) {
      case "yes":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "maybe":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "no":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getRSVPText = (rsvp: Guest["rsvp"]) => {
    return rsvp.charAt(0).toUpperCase() + rsvp.slice(1);
  };

  return (
    <div className="space-y-2">
      {guests.map((guest) => (
        <div
          key={guest.id}
          className="flex items-center justify-between py-3 border-b border-border last:border-0"
          data-testid={`guest-${guest.id}`}
        >
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {guest.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-card-foreground">{guest.name}</span>
          </div>
          <Badge className={getBadgeVariant(guest.rsvp)}>
            {getRSVPText(guest.rsvp)}
          </Badge>
        </div>
      ))}
    </div>
  );
}
