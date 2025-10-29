import { useState } from "react";

type ViewMode = "hosting" | "attending" | "past";

interface EventHeaderProps {
  activeMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export default function EventHeader({ activeMode, onModeChange }: EventHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Host a Move</h1>
        <p className="text-center text-white/90 text-sm mb-6">
          Plan unforgettable gatherings
        </p>
        
        <div className="flex justify-center">
          <div className="inline-flex bg-white/20 rounded-full p-1 gap-1">
            <button
              onClick={() => onModeChange("hosting")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeMode === "hosting"
                  ? "bg-white text-primary shadow-sm"
                  : "text-white hover-elevate"
              }`}
              data-testid="toggle-hosting"
            >
              Hosting
            </button>
            <button
              onClick={() => onModeChange("attending")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeMode === "attending"
                  ? "bg-white text-primary shadow-sm"
                  : "text-white hover-elevate"
              }`}
              data-testid="toggle-attending"
            >
              Attending
            </button>
            <button
              onClick={() => onModeChange("past")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeMode === "past"
                  ? "bg-white text-primary shadow-sm"
                  : "text-white hover-elevate"
              }`}
              data-testid="toggle-past"
            >
              Past Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
