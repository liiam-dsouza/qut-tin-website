export type SessionType = "social" | "talk" | "qa" | "networking" | "break"

export interface ScheduleItem {
  id: string
  time: string
  type: SessionType
  title: string
  description?: string
  durationMins?: number
  speakers?: string[]       // speaker ids from speakers.ts
  expandable?: boolean      // whether clicking opens a modal
}

export const schedule: ScheduleItem[] = [
	{
		id: "doors-open",
		time: "3:00 PM",
		type: "social",
		title: "Doors Open",
		description: "Arrive early to get registered, grab a drink, and get a head start on networking. The best conversations often happen before the sessions even start - don't miss out on making those early connections.",
		durationMins: 60,
	},
	{
		id: "opening",
		time: "4:00 PM",
		type: "talk",
		title: "Event Opening",
		description: "We kick off Tech Industry Night 2026 with a welcome from the organising team. Get settled, meet the faces behind the event, and hear what's in store for the night ahead. Welcome to Tech Industry Night 2026!",
		durationMins: 10,
	},
	{
		id: "keynote-1",
		time: "4:10 PM",
		type: "talk",
		title: "Keynote Presentation 1",
		description: "TBC. Stay tuned!",
		durationMins: 20,
	},
	{
		id: "keynote-2",
		time: "4:30 PM",
		type: "talk",
		title: "Keynote Presentation 2",
		description: "TBC. Stay tuned!",
		durationMins: 20,
	},
	{
		id: "panel-qa",
		time: "4:50 PM",
		type: "qa",
		title: "Panel Q&A",
		description: "An open forum with our panel of industry professionals. Bring your questions - whether you're curious about breaking into the industry, navigating your career, or what the future of tech looks like. This is your chance to get insights directly from the experts.",
		durationMins: 60,
		speakers: ["mia-wheatley", "sean-finn", "philip-fraser"],
		expandable: true,
	},
	{
		id: "networking",
		time: "5:50 PM",
		type: "networking",
		title: "Networking & Food",
		description: "The floor is yours. Mingle with industry professionals, swap details, and grab some food and drinks on us. This is the heart of the night - make the most of every conversation. We'll have conversation starters and tips to help you break the ice.",
		durationMins: 130,
	},
	{
		id: "closing",
		time: "8:00 PM",
		type: "talk",
		title: "Event Conclusion",
		description: "A wrap on an incredible night. We'll thank our speakers, sponsors, and everyone who made TIN 2026 happen - but the connections you made tonight are just getting started. We'll share resources to help you keep the momentum going in your career.",
		durationMins: 15,
	},
]

export const sessionTypeLabels: Record<SessionType, string> = {
	social: "Social",
	talk: "Talk",
	qa: "Q&A",
	networking: "Networking",
	break: "Break",
}
