// src/pages/Team.tsx
import { motion } from "framer-motion"
import { IconBrandLinkedin } from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { team, type TeamMember } from "@/data/team"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"
import { event } from "@/data/event"

function MemberAvatar({ member, size = "md" }: { member: TeamMember; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm:  "h-16 w-16 text-xl",
    md:  "h-24 w-24 text-3xl",
    lg:  "h-32 w-32 text-4xl",
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden shrink-0`}>
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full bg-brand-gradient flex items-center justify-center">
          <span className="font-heading font-bold text-white">
            {member.name.charAt(0)}
          </span>
        </div>
      )}
    </div>
  )
}

function LeadCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      variants={fadeUpItem}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="flex flex-col h-full transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5">
        <CardContent className="flex flex-col items-center text-center gap-4 pt-8 pb-6">
          <MemberAvatar member={member} size="lg" />

          <div className="flex flex-col gap-1">
            <h3 className="font-heading font-bold text-lg">{member.name}</h3>
            <p className="text-md text-muted-foreground">{member.role}</p>
            <p className="text-md text-muted-foreground">{member.club}</p>
          </div>

          {member.linkedin && (
			<a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <IconBrandLinkedin className="h-4 w-4" />
            </a>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      variants={fadeUpItem}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="flex flex-col h-full transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5">
        <CardContent className="flex items-center gap-4 py-4">
          <MemberAvatar member={member} size="sm" />

          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
			<h3 className="font-heading font-semibold text-lg">
				{member.name}
			</h3>
			<p className="text-md text-muted-foreground">{member.role}</p>
			{member.club && (
				<p className="text-md text-muted-foreground">{member.club}</p>
			)}
		</div>

          {member.linkedin && (
			<a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors shrink-0"
            >
              <IconBrandLinkedin className="h-3.5 w-3.5" />
            </a>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Team() {
  const leads   = team.filter((m) => m.tier === "lead")
  const members = team.filter((m) => m.tier === "member")
  const hasTeam = team.length > 0

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 py-24 flex flex-col gap-20"
      >
        {/* Header */}
        <motion.div variants={fadeUpItem} className="text-center flex flex-col gap-3">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            The People Behind It
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl">
            Meet the <span className="text-brand-gradient">Team</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tech Industry Night {event.year} is organised entirely by students,
            for students. Meet the committee members who make it happen.
          </p>
        </motion.div>

        {hasTeam ? (
          <div className="flex flex-col gap-16">
            {/* Leads */}
            {leads.length > 0 && (
              <motion.div
                variants={fadeUpContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="flex flex-col gap-8"
              >
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-brand-gradient text-white border-0">
                    Event Leads
                  </Badge>
                  <Separator className="flex-1" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {leads.map((member) => (
                    <LeadCard key={member.id} member={member} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Members */}
            {members.length > 0 && (
              <motion.div
                variants={fadeUpContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="flex flex-col gap-8"
              >
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-brand-purple/10 text-brand-purple border-brand-purple/20">
                    Organising Committee
                  </Badge>
                  <Separator className="flex-1" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            variants={fadeUpItem}
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
          >
            <p className="text-muted-foreground max-w-sm">
              The organising committee for Tech Industry Night {event.year} will
              be announced soon. Stay tuned!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
