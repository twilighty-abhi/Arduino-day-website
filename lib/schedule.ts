export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  type: "workshop" | "keynote" | "hands-on" | "break" | "networking";
}

export const scheduleData: ScheduleItem[] = [
  { time: "09:00", title: "Registration & Coffee", description: "Check-in and networking", type: "networking" },
  { time: "09:30", title: "Opening Keynote", description: "Arduino Days 2026 theme and vision", type: "keynote" },
  { time: "10:30", title: "Workshop 1", description: "Getting started with Arduino UNO Q", type: "workshop" },
  { time: "12:00", title: "Lunch Break", description: "Catered lunch and networking", type: "break" },
  { time: "13:00", title: "Hands-on Session", description: "Build your first AI-powered project", type: "hands-on" },
  { time: "15:00", title: "Community Showcase", description: "Maker projects and demos", type: "hands-on" },
  { time: "16:30", title: "Closing & Prizes", description: "Wrap-up and raffle", type: "keynote" },
];
