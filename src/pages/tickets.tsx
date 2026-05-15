import { motion } from "framer-motion"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"
import { event } from "@/data/event"

export default function Tickets() {
  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-6 py-24 flex flex-col gap-12"
      >
        {/* Header */}
        <motion.div variants={fadeUpItem} className="text-center flex flex-col gap-3">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Secure Your Spot
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl">
            Get Your{" "}
            <span className="text-brand-gradient">Tickets</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join us for Tech Industry Night {event.year} — the flagship networking
            event for students, founders, and industry leaders.
          </p>
        </motion.div>

        {/* Widget */}
        <motion.div
          variants={fadeUpItem}
          className="w-full rounded-2xl overflow-hidden min-h-screen border border-border"
        >
          <div style={{ height: "900px", overflow: "hidden" }} className="w-full rounded-2xl border border-border">
			<iframe
				src="https://events.humanitix.com/tech-industry-night-2026/tickets?widget=checkout"
				className="w-full h-full"
			/>
			</div>
        </motion.div>
      </motion.div>
    </div>
  )
}
