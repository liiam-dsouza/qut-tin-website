// src/components/sections/ValueProps.tsx
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, GraduationCap, Network, Lightbulb, Briefcase, Users, Star, TrendingUp } from "lucide-react"
import { event } from "@/data/event"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"
import type { LucideIcon } from "lucide-react"

interface Perk {
  label: string
  icon: LucideIcon
}

const studentPerks: Perk[] = [
  { label: "Network with top tech companies",   icon: Network    },
  { label: "Discover internship opportunities", icon: Briefcase  },
  { label: "Gain insights from industry leaders", icon: Lightbulb },
]

const industryPerks: Perk[] = [
  { label: "Showcase your company to top students", icon: Star       },
  { label: "Access a diverse pool of emerging talent", icon: Users   },
  { label: "Build lasting relationships with future talent", icon: TrendingUp },
]

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

function PerkList({ perks }: { perks: Perk[] }) {
  return (
    <ul className="flex flex-col gap-3 mt-4">
      {perks.map((perk) => (
        <li key={perk.label} className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <perk.icon className="h-4 w-4 text-primary" />
          </div>
          {perk.label}
        </li>
      ))}
    </ul>
  )
}

interface ValueCardProps {
  icon: LucideIcon
  title: string
  description: string
  perks: Perk[]
  cta: React.ReactNode
  gradient?: boolean
}

function ValueCard({ icon: Icon, title, description, perks, cta, gradient }: ValueCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="flex flex-col h-full transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5">
        <CardHeader className="gap-4">
          <div
            className={`h-12 w-12 rounded-xl flex items-center justify-center ${
              gradient
                ? "bg-brand-gradient"
                : "bg-muted"
            }`}
          >
            <Icon className={`h-6 w-6 ${gradient ? "text-white" : "text-muted-foreground"}`} />
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle className="font-heading text-xl">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 justify-between gap-6">
          <PerkList perks={perks} />
          {cta}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ValueProps() {
  return (
    <section className="py-24 px-6">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto flex flex-col gap-16"
      >
        {/* Heading */}
        <motion.div variants={fadeUpItem} className="text-center flex flex-col gap-3">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            The Value
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            Why Attend?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            An ecosystem where academic excellence meets industry expertise.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={fadeUpContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          <ValueCard
            icon={GraduationCap}
            title="For Students"
            description="Kickstart your career by connecting with the people who are building the future. Don't just apply for jobs — build relationships."
            perks={studentPerks}
            gradient
            cta={
              <Button className="bg-brand-gradient text-white border-0 w-full hover:opacity-90 transition-opacity">
                <a href={event.ticketingUrl} target="_blank" rel="noreferrer">
                  Get Your Ticket
                </a>
              </Button>
            }
          />
          <ValueCard
            icon={Building2}
            title="For Industry"
            description="Identify and recruit high-potential talent before they even graduate. Position your brand as a leader in the QUT tech community."
            perks={industryPerks}
            cta={
              <Button variant="outline" className="w-full">
                <a href={`mailto:${event.email.industry}`}>
                  Partner With Us
                </a>
              </Button>
            }
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ValueProps
