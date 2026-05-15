export type SponsorTier = "platinum" | "gold" | "silver" | "bronze" | "partner"

export interface Sponsor {
  id: string
  name: string
  tier: SponsorTier
  logo: string                  // path to logo asset
  website: string
  description?: string          // optional blurb for the sponsors page
  industry?: string             // e.g. "Cybersecurity", "Consulting", "Cloud"
}

export const sponsors: Sponsor[] = [
  // {
  //   id: "example-co",
  //   name: "Example Co",
  //   tier: "gold",
  //   logo: "/sponsors/example-co.png",
  //   website: "https://example.com",
  //   description: "...",
  //   industry: "Cybersecurity",
  // },
]

export const tierOrder: SponsorTier[] = [
  "platinum",
  "gold",
  "silver",
  "bronze",
  "partner",
]

export const tierLabels: Record<SponsorTier, string> = {
  platinum: "Platinum",
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
  partner: "Community Partner",
}
