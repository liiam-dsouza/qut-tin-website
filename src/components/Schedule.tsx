import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SessionModal } from "@/components/SessionModal"
import { schedule, sessionTypeLabels, type ScheduleItem, type SessionType } from "@/data/schedule"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"

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
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null)

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
        <motion.div variants={fadeUpContainer} className="flex flex-col">
          {schedule.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUpItem}
              className="flex gap-6"
            >
              {/* Time */}
              <div className="w-20 shrink-0 text-sm text-muted-foreground pt-5 tabular-nums text-right">
                {item.time}
              </div>

              {/* Spine */}
              <div className="flex flex-col items-center">
                <div className={`mt-5 h-3 w-3 rounded-full shrink-0 ring-2 ring-background ${sessionTypeDot[item.type]}`} />
                {index < schedule.length - 1 && (
                  <div className="flex-1 w-px bg-border mt-1" />
                )}
              </div>

              {/* Content */}
              <div
                onClick={() => item.expandable && setSelectedItem(item)}
                className={`flex items-start justify-between gap-2 flex-1 py-4 pb-8 ${
                  item.expandable
                    ? "cursor-pointer group"
                    : ""
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-heading font-semibold transition-colors duration-200 ${
                      item.expandable ? "group-hover:text-primary" : ""
                    }`}>
                      {item.title}
                    </h3>
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
                {item.expandable && (
                  <ChevronRight className="size-4 text-muted-foreground shrink-0 mt-1 transition-transform duration-150 group-hover:translate-x-2" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <SessionModal
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  )
}

export default Schedule
