export type SessionType = "social" | "talk" | "qa" | "networking" | "break"

export interface ScheduleItem {
	id: string
	time: string                  // display string e.g. "3:00 PM"
	type: SessionType
	title: string
	description?: string
	speaker?: string              // speaker id, links to speakers.ts
	durationMins?: number
}

export const schedule: ScheduleItem[] = [
	{
		id: "doors-open",
		time: "3:00 PM",
		type: "social",
		title: "Doors Open",
		description: "Check-in and early networking with industry.",
		durationMins: 60,
	},
	{
		id: "opening",
		time: "4:00 PM",
		type: "talk",
		title: "Event Opening",
		description: "Welcome to Tech Industry Night 2026!",
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
		description: "Panel Q&A with attending industry.",
		durationMins: 60,
	},
	{
		id: "networking",
		time: "5:50 PM",
		type: "networking",
		title: "Networking & Food",
		description: "Chat with attending industry and enjoy food and beverages.",
		durationMins: 130,
	},
	{
		id: "closing",
		time: "8:00 PM",
		type: "talk",
		title: "Event Conclusion",
		description: "Thank you for coming!",
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
