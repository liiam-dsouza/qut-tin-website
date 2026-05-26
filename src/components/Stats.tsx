// src/components/sections/Stats.tsx
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 300, suffix: "+", label: "Students Attended" },
  { value: 20,  suffix: "+", label: "Industry Companies" },
  { value: 12,  suffix: "",  label: "Student Clubs" },
]

function useCountUp(target: number, duration: number = 1500, start: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const count = useCountUp(stat.value, 1500, start)

  return (
    <motion.div
      variants={fadeUpItem}
      className="flex flex-col items-center justify-center gap-2 text-center"
    >
      <span className="font-heading font-extrabold text-3xl md:text-6xl flex items-baseline gap-2 text-brand-gradient">
        <span>{count}</span><span>{stat.suffix}</span>
      </span>
      <span className="text-sm text-muted-foreground uppercase tracking-widest">
        {stat.label}
      </span>
    </motion.div>
  )
}

function Stats() {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 px-6 border-y border-border bg-muted/20">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-3xl mx-auto grid grid-cols-3 gap-6 divide-x divide-border"
      >
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} start={started} />
        ))}
      </motion.div>
    </section>
  )
}

export default Stats
