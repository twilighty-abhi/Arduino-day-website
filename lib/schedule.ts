export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  linkLabel?: string;
  linkUrl?: string;
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
    title: "Rethinking Arduino with Rust",
    description:
      "Midlaj C · SWE @ Desh Keyboard · Anin Arafath · SWE @ Desh Keyboard • 20 mins",
    type: "flash-talk",
  },
  {
    time: "10:35",
    title: "Microprocessors",
    description: "Shan Shoukath · Maker • 20 mins",
    type: "flash-talk",
  },
  {
    time: "10:55",
    title: "TBD",
    description: "TBD • 20 mins",
    type: "talk",
  },
  {
    time: "11:15",
    title: "Tea Break",
    description: "25 mins",
    type: "interactive",
  },
  {
    time: "11:40",
    title: "Arduino Q: Possibilities",
    description:
      "Salman Faris · Community @ Screenly.io · Co-founder, MakerGram • 40 mins",
    type: "talk",
  },
  {
    time: "12:20",
    title: "From prototype to product — scale up your Arduino project",
    description: "Mohammed Shan · Maker • 20 mins",
    type: "flash-talk",
  },
  {
    time: "12:40",
    title: "Lunch Break",
    description: "55 mins · Food not provided — please arrange your own meal.",
    linkLabel: "Food place suggestions",
    linkUrl:
      "https://tinkerhub.frappe.cloud/tinkerspace/accessibility#:~:text=min%20View%20Location-,Food%20Spots,-11%20to%2011",
    type: "break",
  },
  {
    time: "13:35",
    title: "Line Following Robot Competition",
    description: "60 mins · Prizes for winners.",
    type: "competition",
  },
  {
    time: "14:35",
    title: "Seeed Studio x TinkerSpace: Hardware Donation Session",
    description:
      "Salman Faris · Community @ Screenly.io · Co-founder, MakerGram • 30 mins",
    type: "talk",
  },
  {
    time: "15:05",
    title: "Networking Break",
    description: "25 mins",
    type: "interactive",
  },
  {
    time: "15:30",
    title: "Turning an Office into a Smart Workspace",
    description: "Muhammed Ziyad · SWE @ Desh Keyboard • 40 mins",
    type: "talk",
  },
  {
    time: "16:10",
    title: "Closing + Open Floor / Networking",
    description: "Organizers • 25 mins",
    type: "networking",
  },
];
