export type TeamRole = "lead" | "member"

export interface TeamMember {
	id: string
	name: string
	role: string                  // their committee title e.g. "Event Director"
	club?: string                  // which organising club they represent
	photo?: string                // optional headshot
	linkedin?: string
	tier: TeamRole               // leads shown more prominently
}

export const team: TeamMember[] = [
	{
		id: "liam-dsouza",
		name: "Liam D'Souza",
		role: "Event Director",
		club: " ",
		photo: "/team/liam-dsouza.png",
		linkedin: "https://linkedin.com/in/liiam-dsouza",
		tier: "lead",
	},
	{
		id: "lachlan-douglass",
		name: "Lachlan Douglass",
		role: "Sponsorship Director",
		club: "QUT Law, Innovation & Technology Society",
		photo: "/team/lachlan-douglass.png",
		linkedin: "https://www.linkedin.com/in/lachlan-douglass-383a7430a/",
		tier: "lead",
	},
	{
		id: "hope-burke",
		name: "Hope Burke",
		role: "Volunteer Coordinator",
		club: "QUT Law, Innovation & Technology Society",
		photo: "/team/hope-burke.png",
		linkedin: "https://www.linkedin.com/in/hope-burke-bb80813b9/",
		tier: "lead",
	},
	{
		id: "peyten-redburn",
		name: "Peyten Redburn",
		role: "Front of House Liaison",
		club: "QUT Game Development Club",
		photo: "/team/peyten-redburn.png",
		linkedin: "https://www.linkedin.com/in/peytenredburn/",
		tier: "lead",
	},
	{
		id: "matthew-siedlecki",
		name: "Matthew Siedlecki",
		role: "Industry Director",
		club: "QUT Aerospace Society",
		photo: "/team/matthew-siedlecki.png",
		linkedin: "https://www.linkedin.com/in/matthew-sied/",
		tier: "lead",
	},
	{
		id: "jonathan-lim",
		name: "Jonathan Lim",
		role: "Industry Officer",
		photo: "/team/jonathan-lim.png",
		linkedin: "https://www.linkedin.com/in/limjo184/",
		tier: "member",
	},
	{
		id: "xanther-robinson",
		name: "Xanther Robinson",
		role: "Industry Officer",
		club: "QUT Electrical Engineering Student Society",
		photo: "/team/xanther-robinson.png",
		linkedin: "https://www.linkedin.com/in/xanther-robinson/",
		tier: "member",
	},
	{
		id: "william-qu",
		name: "William Qu",
		role: "Industry Officer",
		club: "Code Network",
		photo: "/team/william-qu.png",
		linkedin: "https://www.linkedin.com/in/williamqu-it/",
		tier: "member",
	},
	{
		id: "meagan-shaw",
		name: "Meagan Shaw",
		role: "Marketing Officer",
		club: "QUT Game Development Club",
		//photo: "/team/meagan-shaw.png",
		linkedin: "https://www.linkedin.com/in/meagan-shaw/",
		tier: "member",
	},
	{
		id: "ashley-grant",
		name: "Ashley Grant",
		role: "Marketing Officer",
		club: "QUT Reality Labs",
		photo: "/team/ashley-grant.png",
		linkedin: "https://www.linkedin.com/in/ashley-grant-43024a24b/",
		tier: "member",
	},
	{
		id: "ayisha-del-rosario",
		name: "Ayisha del Rosario",
		role: "Marketing Officer",
		club: "Women in Technology QUT",
		photo: "/team/ayisha-del-rosario.png",
		linkedin: "https://www.linkedin.com/in/ayisha-d-454652269/",
		tier: "member",
	},
	{
		id: "jamie-robinson",
		name: "Jamie Robinson",
		role: "Venue Planning Officer",
		club: "QUT Game Development Club",
		photo: "/team/jamie-robinson.png",
		linkedin: "https://www.linkedin.com/in/jamie-robinson-a038082b8/",
		tier: "member",
	},
	{
		id: "jessica-wong",
		name: "Jessica Wong",
		role: "Venue Planning Officer",
		club: "Business Analytics and Data Science Club",
		//photo: "/team/jessica-wong.png",
		linkedin: "https://www.linkedin.com/in/jessica-wong-394204363/",
		tier: "member",
	}
]
