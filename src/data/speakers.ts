export interface Speaker {
	id: string
	name: string
	title: string
	company: string
	bio: string[]
	photo: string
	linkedin: string
}

export const speakers: Speaker[] = [
	{
		id: "mia-wheatley",
		name: "Mia Wheatley",
		title: "Junior Information Security Architect",
		company: "Queensland University of Technology",
		bio: [
			"Mia Wheatley is a Junior Information Security Architect at Queensland University of Technology, where her work focuses on security architecture design and design review across enterprise initiatives. A recent QUT Computer Science graduate, she has spent several years working within a large, complex university environment and is building her expertise at the intersection of security strategy and practical implementation.",
			"Alongside her professional role, she has served on the executive of Women in Technology at QUT for over two years, and currently holds the Alumni Liaison role - working to keep graduates connected to the community they came from. She enjoys mentoring students who are exploring pathways into cybersecurity."
		],
		photo: "/speakers/mia-wheatley.png",
		linkedin: "https://www.linkedin.com/in/mia-wheatley/",
	},
	{
		id: "sean-finn",
		name: "Sean Finn",
		title: "Founding Membership Chair",
   	 	company: "ISC2 Queensland Chapter",
		bio: [
			"Sean is the Founding Membership Chair at (ISC)2 Queensland Chapter, and works as the Director of Security and Infrastructure at Best Practice Software.Sean holds a CISSP, CC, Executive MBA from ACU, Bachelor of IT majoring in Networked Systems from QUT and Grad Cert in the Psychology of Risk from ACU.",
			"Sean has deep experience in providing mission critical ICT in internet-facing ecommerce systems and operational technology systems for Mining, Defence, Aviation and Health Care. Sean has acted as the final technical escalation point for incident response over a twenty-year period for these environments and has a deep passion for incident prevention and automating security into the software supply chain.",
			"Since 2000 he has incubated, developed and sold multiple small ICT Technology firms from the ground up in Datacentres, Webhosting, ISP and Ecommerce and has extensive practical commercial experience alongside his technical expertise.",
			"Sean is recognised as an Experienced Dev Ops Software Engineer, Solutions Architect, Internet Network Engineer, Commercial Hosting provider and a Mining and Defence Secure ICT Platform Engineer."
		],
		photo: "/speakers/sean-finn.png",
    	linkedin: "https://www.linkedin.com/in/seanfinn/",
	},
	{
		id: "philip-fraser",
		name: "Philip Fraser",
		title: "Engineering Manager",
		company: "Tanda",
		bio: [
			"Philip is the Engineering Manager at Tanda, a Brisbane-based B2B SaaS company building workforce management software used by thousands of businesses to run time and attendance, payroll, and HR for their frontline teams.",
			"He leads a group of engineering teams working on a Rails monolith that ships to production continuously. His focus is on building teams that move fast, ship often, and stay close to the customers they're building for - and lately, on figuring out where AI fits into how they do that day-to-day.",
		],
		photo: "/speakers/philip-fraser.png",
		linkedin: "https://www.linkedin.com/in/philip-fraser/",
	}
] as const
