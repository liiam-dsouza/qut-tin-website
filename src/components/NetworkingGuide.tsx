import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"
import { Link } from "react-router-dom"

const checklist = [
  { id: "resume",    label: "Resume / Portfolio QR Code", emoji: "📄", href: "/qr-generator" },
  { id: "pitch",     label: "30-Second Elevator Pitch",   emoji: "🎤", href: undefined },
  { id: "linkedin",  label: "Polished LinkedIn Profile",  emoji: "🔗", href: undefined },
  { id: "outfit",    label: "Smart Casual Outfit",        emoji: "✨", href: undefined },
  { id: "questions", label: "3 Questions for Employers",  emoji: "❓", href: undefined },
]

const statusMessages: Record<number, { title: string; subtitle: string }> = {
  0: { title: "Ready to Impress?",   subtitle: "Start ticking off your checklist." },
  1: { title: "Good Start!",         subtitle: "Keep the momentum going." },
  2: { title: "Making Progress!",    subtitle: "You're getting there." },
  3: { title: "More than Halfway!",  subtitle: "Almost networking-ready." },
  4: { title: "Nearly There!",       subtitle: "One more and you're set." },
  5: { title: "Ready to Impress!",   subtitle: "You're all set. Go kill it." },
}

const SIZE         = 280
const STROKE       = 15
const RADIUS       = (SIZE / 2) - (STROKE * 2)
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function NetworkingGuide() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const progress   = checked.size / checklist.length
  const percentage = Math.round(progress * 100)
  const offset     = CIRCUMFERENCE * (1 - progress)
  const status     = statusMessages[checked.size]

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
            Get Prepared
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            Networking Survival Guide
          </h2>
          <p className="text-muted-foreground">
            Prepare like a pro so you can focus on the conversations.
          </p>
        </motion.div>

        {/* Checklist + Spinner */}
        <motion.div
          variants={fadeUpItem}
          className="flex flex-col md:flex-row gap-6 items-center"
        >
          {/* Checklist */}
          <ul className="flex flex-col gap-3 flex-1 w-full">
            {checklist.map((item) => {
              const isChecked = checked.has(item.id)
              return (
                <motion.li
                  key={item.id}
                  layout
                  onClick={() => toggle(item.id)}
                  className={`flex items-center justify-between gap-4 px-5 py-4 rounded-xl border cursor-pointer select-none transition-colors duration-200 ${
                    isChecked
                      ? "bg-primary/5 border-primary/20"
                      : "bg-card border-border hover:border-primary/30 hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    {item.href ? (
						<Link
							to={item.href}
							className="font-heading font-semibold text-sm text-primary hover:underline transition-colors group flex items-center justify-center gap-2"
							onClick={(e) => e.stopPropagation()}
						>
							{item.label}
							<ChevronRight className="size-4 text-muted-foreground shrink-0 mt-1 transition-transform duration-150 group-hover:translate-x-2" />
						</Link>
						) : (
						<span className="font-heading font-semibold text-sm text-foreground">
							{item.label}
						</span>
					)}
                  </div>

                  <div
                    className={`shrink-0 h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      isChecked
                        ? "bg-primary border-primary"
                        : "border-border bg-transparent"
                    }`}
                  >
                    <AnimatePresence>
                      {isChecked && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check className="size-3.5 text-primary-foreground" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              )
            })}
          </ul>

          {/* Radial progress */}
          <div className="flex flex-col items-center justify-center gap-4 shrink-0 w-64">
            <div className="relative">
              <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                <circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={STROKE}
                  className="text-muted"
                />
                <motion.circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ transformOrigin: "center", rotate: "-90deg" }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#E91E8C" />
                    <stop offset="50%"  stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
                <text
                  x={SIZE / 2}
                  y={SIZE / 2 - 5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-heading font-bold fill-foreground"
                  style={{ fontSize: "35px", fontFamily: "var(--font-heading)" }}
                >
                  {percentage}%
                </text>
                <text
                  x={SIZE / 2}
                  y={SIZE / 2 + 18}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground"
                  style={{ fontSize: "15px", fontFamily: "var(--font-sans)" }}
                >
                  {checked.size}/{checklist.length} done
                </text>
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={checked.size}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-center flex flex-col gap-1"
              >
                <p className="font-heading font-bold text-lg">{status.title}</p>
                <p className="text-sm text-muted-foreground">{status.subtitle}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default NetworkingGuide
