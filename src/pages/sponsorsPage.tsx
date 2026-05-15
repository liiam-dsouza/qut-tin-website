// src/pages/Sponsors.tsx
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { sponsors, tierOrder, tierLabels, type SponsorTier } from "@/data/sponsors"
import { event } from "@/data/event"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"

const tierGridCols: Record<SponsorTier, string> = {
  platinum: "grid-cols-1 sm:grid-cols-2",
  gold:     "grid-cols-2 sm:grid-cols-3",
  silver:   "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  bronze:   "grid-cols-3 sm:grid-cols-4 lg:grid-cols-5",
  partner:  "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6",
}

const tierLogoSize: Record<SponsorTier, string> = {
  platinum: "h-20",
  gold:     "h-16",
  silver:   "h-12",
  bronze:   "h-10",
  partner:  "h-8",
}

const tierBadgeStyle: Record<SponsorTier, string> = {
  platinum: "bg-brand-gradient text-white border-0",
  gold:     "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
  silver:   "bg-muted text-muted-foreground border-border",
  bronze:   "bg-brand-orange/5 text-brand-orange/70 border-brand-orange/10",
  partner:  "bg-brand-purple/10 text-brand-purple border-brand-purple/20",
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <p className="text-muted-foreground max-w-sm">
        Sponsorship packages for Tech Industry Night {event.year} are now open.
        Get in touch to secure your spot.
      </p>
      <Button className="bg-brand-gradient text-white border-0">
        <a href={`mailto:${event.email.industry}`}>Enquire About Sponsorship</a>
      </Button>
    </div>
  )
}

export default function Sponsors() {
  const activeTiers = tierOrder.filter((tier) =>
    sponsors.some((s) => s.tier === tier)
  )
  const hasSponsors = activeTiers.length > 0

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 py-24 flex flex-col gap-20"
      >
        {/* Header */}
        <motion.div variants={fadeUpItem} className="flex flex-col gap-4 text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Powering the Event
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl">
            Our <span className="text-brand-gradient">Sponsors</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tech Industry Night {event.year} is made possible by the support of
            these incredible organisations.
          </p>
        </motion.div>

        {/* Tiers */}
        {hasSponsors ? (
          <div className="flex flex-col gap-16">
            {activeTiers.map((tier, index) => {
              const tiersponsors = sponsors.filter((s) => s.tier === tier)
              return (
                <motion.div
                  key={tier}
                  variants={fadeUpItem}
                  className="flex flex-col gap-8"
                >
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className={tierBadgeStyle[tier]}
                    >
                      {tierLabels[tier]}
                    </Badge>
                    <Separator className="flex-1" />
                  </div>

                  <div className={`grid ${tierGridCols[tier]} gap-6`}>
                    {tiersponsors.map((sponsor) => (
					  <a
                        key={sponsor.id}
                        href={sponsor.website}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col gap-4 p-6 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/30 transition-all duration-200"
                      >
                        {/* Logo */}
                        <div className="flex items-center justify-center py-4">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className={`${tierLogoSize[tier]} w-auto object-contain transition-opacity duration-200 group-hover:opacity-80`}
                          />
                        </div>

                        {/* Info — only shown for platinum/gold */}
                        {(tier === "platinum" || tier === "gold") && (
                          <>
                            <Separator />
                            <div className="flex flex-col gap-2">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                  <p className="font-heading font-semibold text-sm">
                                    {sponsor.name}
                                  </p>
                                  {sponsor.industry && (
                                    <p className="text-xs text-muted-foreground">
                                      {sponsor.industry}
                                    </p>
                                  )}
                                </div>
                                <ExternalLink className="size-3.5 text-muted-foreground shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              {sponsor.description && (
                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                  {sponsor.description}
                                </p>
                              )}
                            </div>
                          </>
                        )}
                      </a>
                    ))}
                  </div>

                  {index < activeTiers.length - 1 && (
                    <div className="h-px bg-border" />
                  )}
                </motion.div>
              )
            })}
          </div>
        ) : (
          <motion.div variants={fadeUpItem}>
            <EmptyState />
          </motion.div>
        )}

        {/* Become a sponsor CTA */}
        {hasSponsors && (
          <motion.div
            variants={fadeUpItem}
            className="flex flex-col items-center gap-6 text-center py-16 px-6 rounded-2xl border border-border bg-muted/20"
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-heading font-bold text-2xl">
                Become a Sponsor
              </h2>
              <p className="text-muted-foreground max-w-md">
                Interested in partnering with Tech Industry Night {event.year}?
                Get in touch to discuss sponsorship opportunities.
              </p>
            </div>
            <Button className="bg-brand-gradient text-white border-0">
              <a href={`mailto:${event.email.industry}`}>
                Enquire About Sponsorship
              </a>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
