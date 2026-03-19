export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  type:
    | "workshop"
    | "talk"
    | "flash-talk"
    | "hands-on"
    | "break"
    | "networking"
    | "interactive"
    | "competition"
    | "demo";
}

export const scheduleData: ScheduleItem[] = [
  {
    time: "10:00",
    title: "Welcome + Intro",
    description: "Organizers • 15 mins",
    type: "talk",
  },
  {
    time: "10:15",
    title: "Rust in Arduino",
    description: "Midlaj + Samad • 20 mins",
    type: "flash-talk",
  },
  {
    time: "10:35",
    title: "Microprocessors",
    description: "Shan Shoukath • 20 mins",
    type: "flash-talk",
  },
  {
    time: "10:55",
    title: "Micro Python OS in Arduino",
    description: "TBD • 20 mins",
    type: "talk",
  },
  {
    time: "11:15",
    title: "Interactive",
    description: "25 mins",
    type: "interactive",
  },
  {
    time: "11:40",
    title: "Arduino Q: Possibilities",
    description: "Salman • 40 mins",
    type: "talk",
  },
  {
    time: "12:20",
    title: "What beyond Arduino? (MCU to PCB)",
    description: "TBD • 20 mins",
    type: "flash-talk",
  },
  {
    time: "12:40",
    title: "Lunch Break",
    description: "55 mins",
    type: "break",
  },
  {
    time: "13:35",
    title: "Micro Mouse / Line Following Competition",
    description: "60 mins",
    type: "competition",
  },
  {
    time: "14:35",
    title: "3D Enclosure for Arduino Components",
    description: "TBD • 30 mins",
    type: "demo",
  },
  {
    time: "15:05",
    title: "Interactive",
    description: "25 mins",
    type: "interactive",
  },
  {
    time: "15:30",
    title: "Automating Workspaces",
    description: "Ziyad • 40 mins",
    type: "talk",
  },
  {
    time: "16:10",
    title: "Closing + Open Floor / Networking",
    description: "Organizers • 25 mins",
    type: "networking",
  },
  {
    time: "16:35",
    title: "End",
    description: "—",
    type: "break",
  },
];
