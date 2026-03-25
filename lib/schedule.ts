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

/** Buffer slots and formal End row are omitted — they are not shown in the UI. */
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
    title: "Think Like a Machine : Microprocessors",
    description: "Shan Shoukath · Maker • 20 mins",
    type: "flash-talk",
  },
  {
    time: "10:55",
    title: "Tea Break",
    description: "25 mins",
    type: "break",
  },
  {
    time: "11:30",
    title: "Arduino Q: A New Kind of Arduino, What’s New & Why It Matters",
    description:
      "Salman Faris · Community @ Screenly.io · Co-founder, MakerGram • 40 mins",
    type: "talk",
  },
  {
    time: "12:10",
    title: "From Prototype to Product — Scale up your Arduino Project",
    description: "Mohammed Shan · Maker • 20 mins",
    type: "flash-talk",
  },
  {
    time: "12:30",
    title: "Lunch Break",
    description: "60 mins · Food not provided — please arrange your own meal.",
    linkLabel: "Food place suggestions",
    linkUrl:
      "https://tinkerhub.frappe.cloud/tinkerspace/accessibility#:~:text=min%20View%20Location-,Food%20Spots,-11%20to%2011",
    type: "break",
  },
  {
    time: "13:30",
    title: "Line Following Robot Competition",
    description: "60 mins · Prizes for winners.",
    type: "competition",
  },
  {
    time: "14:30",
    title: "Seeed Studio x TinkerSpace: Hardware Donation Session",
    description:
      "Salman Faris · Community @ Screenly.io · Co-founder, MakerGram • 15 mins",
    type: "talk",
  },
  {
    time: "14:45",
    title: "AI for Embedded Using Arduino",
    description: "Saheen Palayi · Hardware Technologist • 20 mins",
    type: "flash-talk",
  },
  {
    time: "15:15",
    title: "Networking Break",
    description: "25 mins",
    type: "interactive",
  },
  {
    time: "15:40",
    title: "Turning an Office into a Smart Workspace",
    description: "Muhammed Ziyad · SWE @ Desh Keyboard • 40 mins",
    type: "talk",
  },
  {
    time: "16:20",
    title: "Closing + Open Floor / Networking",
    description: "Organizers • 25 mins",
    type: "networking",
  },
];
