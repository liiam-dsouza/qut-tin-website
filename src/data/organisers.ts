export interface Organiser {
    id: string
    name: string
    logo: string
    linkedin: string
    instagram: string
}

export const organisers: Organiser[] = [
	{
		id: "bands",
		name: "Business Analytics and Data Science Club",
		logo: "/logos/bands.png",
		linkedin: "https://www.linkedin.com/company/qutbands/",
		instagram: "https://www.instagram.com/qutbands/",
	},
	{
		id: "cn",
		name: "Code Network",
		logo: "/logos/cn.png",
		linkedin: "https://www.linkedin.com/company/codenetwork/",
		instagram: "https://www.instagram.com/codenetwork_/",
	},
	{
		id: "aero",
		name: "QUT Aerospace Society",
		logo: "/logos/aero.png",
		linkedin: "https://www.linkedin.com/company/qut-aerospace-society/",
		instagram: "https://www.instagram.com/qut_aerospace_society/",
	},
	{
		id: "csc",
		name: "QUT Cyber Security Club",
		logo: "/logos/csc.png",
		linkedin: "https://www.linkedin.com/company/qut-white-hats/",
		instagram: "https://www.instagram.com/qut_cybersec/",
	},
	{
		id: "eess",
		name: "QUT Electrical Engineering Student Society",
		logo: "/logos/eess.png",
		linkedin: "https://www.linkedin.com/company/quteess/",
		instagram: "https://www.instagram.com/qut_eess/",
	},
	{
		id: "gdc",
		name: "QUT Game Development Club",
		logo: "/logos/gdc.png",
		linkedin: "https://www.linkedin.com/company/qut-game-development-club/",
		instagram: "https://www.instagram.com/gdcqut/",
	},
	{
		id: "grc",
		name: "QUT GRC Club",
		logo: "/logos/grc.png",
		linkedin: "https://www.linkedin.com/company/qut-grc-club/",
		instagram: "https://www.instagram.com/qutgrc/",
	},
	{
		id: "lits",
		name: "QUT Law, Innovation & Technology Society",
		logo: "/logos/lits.png",
		linkedin: "https://www.linkedin.com/company/law-innovation-and-technology-society/",
		instagram: "https://www.instagram.com/qutlitsociety/",
	},
	{
		id: "rl",
		name: "QUT Reality Labs",
		logo: "/logos/rl.png",
		linkedin: "https://www.linkedin.com/company/qut-reality-labs/",
		instagram: "https://www.instagram.com/qutrealitylabs_/",
	},
	{
		id: "qutrc",
		name: "QUT Robotics Club",
		logo: "/logos/qutrc.png",
		linkedin: "https://www.linkedin.com/company/qut-robotics-club/",
		instagram: "https://www.instagram.com/qut.roboticsclub/",
	},
	{
		id: "tech",
		name: "QUT The Emerging Coders Hub (TECH)",
		logo: "/logos/tech.jpg",
		linkedin: "https://www.linkedin.com/company/qut-emerging-coders-hub-tech/",
		instagram: "https://www.instagram.com/qut.tech.club/",
	},
	{
		id: "wit",
		name: "Women In Tech",
		logo: "/logos/wit.png",
		linkedin: "https://www.linkedin.com/company/women-in-technology-at-qut/",
		instagram: "https://www.instagram.com/womenintech_qut/",
	},
] as const
