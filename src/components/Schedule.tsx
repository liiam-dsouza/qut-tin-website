import { motion } from "framer-motion"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"

import { Badge } from "@/components/ui/badge"
import { schedule, sessionTypeLabels, type SessionType } from "@/data/schedule"

const sessionTypeColors: Record<SessionType, string> = {
  social:     "bg-brand-purple/10 text-brand-purple border-brand-purple/20",
  talk:       "bg-brand-pink/10 text-brand-pink border-brand-pink/20",
  qa:         "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
  networking: "bg-brand-purple/10 text-brand-purple border-brand-purple/20",
  break:      "bg-muted text-muted-foreground border-border",
}

const sessionTypeDot: Record<SessionType, string> = {
  social:     "bg-brand-purple",
  talk:       "bg-brand-pink",
  qa:         "bg-brand-orange",
  networking: "bg-brand-purple",
  break:      "bg-muted-foreground",
}

function Schedule() {
  return (
    <section id="schedule" className="py-24 px-6">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-3xl mx-auto flex flex-col gap-16"
      >
        {/* Heading */}
        <motion.div variants={fadeUpItem} className="text-center flex flex-col gap-3">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            What's Happening
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            Event Schedule
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Plan your night to make the most of every opportunity.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={fadeUpContainer}
          className="flex flex-col"
        >
          {schedule.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUpItem}
              className="flex gap-6"
            >
              {/* Time column */}
              <div className="w-20 shrink-0 text-sm text-muted-foreground pt-5 tabular-nums text-right">
                {item.time}
              </div>

              {/* Timeline spine */}
              <div className="flex flex-col items-center">
                {/* Dot */}
                <div className={`mt-5 h-3 w-3 rounded-full shrink-0 ring-2 ring-background ${sessionTypeDot[item.type]}`} />
                {/* Vertical line */}
                {index < schedule.length - 1 && (
                  <div className="flex-1 w-px bg-border mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1 py-4 pb-8">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading font-semibold">{item.title}</h3>
                  <Badge
                    variant="outline"
                    className={`text-xs ${sessionTypeColors[item.type]}`}
                  >
                    {sessionTypeLabels[item.type]}
                  </Badge>
                </div>
                {item.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Schedule
