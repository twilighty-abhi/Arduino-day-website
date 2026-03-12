export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  type: "workshop" | "talk" | "flash-talk" | "hands-on" | "break" | "networking";
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
    time: "11:00",
    title: "Micro Python OS in Arduino",
    description: "Speaker: TBD • 40 mins",
    type: "talk",
  },
  {
    time: "11:40",
    title: "Interactive Session",
    description: "Facilitated interactive activities • 25 mins",
    type: "hands-on",
  },
  {
    time: "12:05",
    title: "What beyond Arduino? (MCU to PCB)",
    description: "Speaker: TBD • 40 mins",
    type: "talk",
  },
  {
    time: "12:45",
    title: "Arduino Q: Possibilities",
    description: "Speaker: TBD • 20 mins",
    type: "flash-talk",
  },
  {
    time: "13:05",
    title: "Lunch Break",
    description: "Lunch + informal networking • 55 mins",
    type: "break",
  },
  {
    time: "14:00",
    title: "Micro Mouse / Line Following Competition",
    description: "Hands-on competition • 60 mins",
    type: "hands-on",
  },
  {
    time: "15:00",
    title: "3D Enclosure for Arduino Components",
    description: "Speaker: TBD • 30 mins",
    type: "talk",
  },
  {
    time: "15:30",
    title: "Interactive Session",
    description: "Group activity / challenges • 25 mins",
    type: "hands-on",
  },
  {
    time: "15:55",
    title: "Automating Workspaces",
    description: "Ziyad • 40 mins",
    type: "talk",
  },
  {
    time: "16:35",
    title: "Closing + Open Floor / Networking",
    description: "Organizers • Wrap-up + networking • 25 mins",
    type: "networking",
  },
  {
    time: "17:00",
    title: "End",
    description: "Thank you for joining Arduino Day @ TinkerSpace Kochi!",
    type: "networking",
  },
];
