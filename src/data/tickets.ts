// src/data/tickets.ts

export interface TicketTier {
  id: string
  name: string
  price: number | null          // null = contact us
  priceLabel?: string           // override display e.g. "Contact Us"
  description?: string
  perks: string[]
  ctaLabel: string
  ctaHref: string
  highlighted?: boolean         // renders with accent styling
}

export const tickets: TicketTier[] = [
//   {
//     id: "estudent",
//     name: "eStudent",
//     price: 20,
//     description: "Online digital experience for those who can't attend in person.",
//     perks: [
//       "Online digital experience",
//       "Access to keynote talks",
//       "Access to recordings",
//       "Career guide",
//     ],
//     ctaLabel: "Get Your Ticket",
//     ctaHref: "https://events.humanitix.com/tech-industry-night-2026",
//   },
  {
    id: "student",
    name: "Student",
    price: 40,
    highlighted: true,
    description: "Full in-person access to the flagship networking event of the year.",
    perks: [
      "Event access",
      "Food & drinks",
      "Industry networking",
      "Career guide",
    ],
    ctaLabel: "Get Your Ticket",
    ctaHref: "https://events.humanitix.com/tech-industry-night-2026",
  },
  {
    id: "industry",
    name: "Industry Partner",
    price: null,
    priceLabel: "Contact Us",
    description: "Showcase your company and connect with top emerging talent.",
    perks: [
	 	"Logo on event website",
	  	"Recognition during event",
      	"Talent access",
    	"Brand exposure",
    ],
    ctaLabel: "Partner With Us",
    ctaHref: "mailto:industry@techindustrynight.com",
  },
]
