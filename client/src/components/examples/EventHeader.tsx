import { useState } from "react";
import EventHeader from "../EventHeader";

export default function EventHeaderExample() {
  const [mode, setMode] = useState<"hosting" | "attending" | "past">("hosting");
  
  return <EventHeader activeMode={mode} onModeChange={setMode} />;
}
