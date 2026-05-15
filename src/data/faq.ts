export interface FAQ {
  id: string
  question: string
  answer: string
  category?: "general" | "ticketing" | "logistics" | "industry"
}

export const faqs: FAQ[] = [
	{
		id: "dress-code",
		question: "What is the dress code?",
		answer: "Smart casual is recommended. Think 'first interview' or professional workplace attire.",
		category: "general",
	},
	{
		id: "resume",
		question: "Do I need to bring a resume?",
		answer: "While not required, having a digital portfolio (QR code) or a polished LinkedIn profile is highly recommended.",
		category: "general",
	},
	{
		id: "food",
		question: "Is food provided?",
		answer: "Yes! Canapés and drinks are included with your ticket.",
		category: "logistics",
	},
	{
		id: "who-can-attend",
		question: "Who can attend?",
		answer: "The event is open to all QUT students and recent graduates. Industry professionals attend by invitation or partnership.",
		category: "general",
	},
	{
		id: "parking",
		question: "Is parking available?",
		answer: "Limited paid parking is available at QUT Gardens Point. Public transport via South Bank station is recommended.",
		category: "logistics",
	},
	{
		id: "eticket",
		question: "What is the eStudent ticket?",
		answer: "The eStudent ticket provides online access to keynote recordings and the career guide, for those who cannot attend in person.",
		category: "ticketing",
	},
	{
		id: "refunds",
		question: "Can I get a refund?",
		answer: "Refund policies are managed through Humanitix. Please refer to your booking confirmation for details.",
		category: "ticketing",
	},
] as const
