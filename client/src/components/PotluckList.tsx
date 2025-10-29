import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export interface PotluckItem {
  id: string;
  item: string;
  claimedBy?: string;
}

interface PotluckListProps {
  items: PotluckItem[];
  onClaim?: (itemId: string) => void;
  onUnclaim?: (itemId: string) => void;
  isHost?: boolean;
}

export default function PotluckList({ items, onClaim, onUnclaim, isHost }: PotluckListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className={`rounded-lg p-4 border ${
            item.claimedBy
              ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800"
              : "bg-card border-card-border"
          }`}
          data-testid={`potluck-item-${item.id}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="font-semibold text-base text-card-foreground">
                {item.item}
              </p>
              {item.claimedBy && (
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Claimed by {item.claimedBy}
                </p>
              )}
            </div>
            {!isHost && (
              <Button
                size="sm"
                variant={item.claimedBy ? "outline" : "default"}
                onClick={() =>
                  item.claimedBy ? onUnclaim?.(item.id) : onClaim?.(item.id)
                }
                data-testid={`button-${item.claimedBy ? "unclaim" : "claim"}-${item.id}`}
              >
                {item.claimedBy ? "Unclaim" : "Claim"}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
