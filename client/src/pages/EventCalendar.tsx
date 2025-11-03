import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";

interface EventCalendarProps {
  onBack?: () => void;
}

interface CalendarEvent {
  name: string;
  date: number;
  time: string;
}

export default function EventCalendar({ onBack }: EventCalendarProps) {
  const currentMonth = "December 2025";
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Mock events for December 2025
  const events: CalendarEvent[] = [
    { name: "Sarah's Graduation Party", date: 15, time: "4:00 PM" },
    { name: "Holiday Potluck", date: 23, time: "6:00 PM" },
    { name: "New Year's Eve Bash", date: 31, time: "9:00 PM" },
  ];

  const eventDates = new Set(events.map(e => e.date));

  // December 2025 starts on Monday (day 1) and has 31 days
  const firstDayOfMonth = 1; // Monday
  const daysInMonth = 31;
  
  // Generate calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center">Your Event Calendar</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary mb-6 hover:text-primary/80 transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Calendar */}
        <div className="bg-card rounded-xl p-6 border border-card-border mb-6">
          <h2 className="text-2xl font-bold text-center mb-6">{currentMonth}</h2>
          
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`aspect-square flex items-center justify-center text-center rounded-lg ${
                  day && eventDates.has(day)
                    ? "bg-primary text-primary-foreground font-semibold"
                    : day
                    ? "hover-elevate"
                    : ""
                }`}
                data-testid={day ? `calendar-day-${day}` : undefined}
              >
                {day && (
                  <span className="text-base">{day}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming This Month */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming This Month</h2>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-card-border"
                data-testid={`calendar-event-${index}`}
              >
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  <span>December {event.date} • {event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
