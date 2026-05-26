// src/pages/ElevatorPitch.tsx
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Square, RotateCcw, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"

const PITCH_DURATION = 30

type TimerState = "idle" | "running" | "success" | "overtime"

const tips = [
  "Start with who you are and what you study.",
  "Mention one specific thing you're passionate about.",
  "End with what you're looking for - internship, grad role, advice.",
  "Keep it conversational, not rehearsed.",
  "Practise until it feels natural, not memorised.",
]

export default function ElevatorPitch() {
  const [pitch, setPitch]           = useState("")
  const [timeLeft, setTimeLeft]     = useState(PITCH_DURATION)
  const [overtime, setOvertime]     = useState(0)
  const [timerState, setTimerState] = useState<TimerState>("idle")
  const intervalRef                 = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const start = () => {
    setTimerState("running")
    setTimeLeft(PITCH_DURATION)
    setOvertime(0)

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerState("overtime")
          return 0
        }
        return prev - 1
      })
      setOvertime((prev) => {
        setTimerState((state) => {
          if (state === "overtime") return "overtime"
          return state
        })
        return prev
      })
    }, 1000)
  }

  useEffect(() => {
    if (timerState === "overtime") {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setOvertime((prev) => prev + 1)
      }, 1000)
    }
  }, [timerState])

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timerState === "running") {
      setTimerState("success")
    }
  }

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setTimerState("idle")
    setTimeLeft(PITCH_DURATION)
    setOvertime(0)
  }

  const progress = timerState === "overtime"
    ? 100
    : ((PITCH_DURATION - timeLeft) / PITCH_DURATION) * 100

  const circumference = 2 * Math.PI * 54
  const strokeOffset  = circumference * (1 - progress / 100)

  const arcColor =
    timerState === "success"  ? "#22c55e" :
    timerState === "overtime" ? "#ef4444" :
    timeLeft <= 5             ? "#F97316" :
    "#7C3AED"

  const displayTime = timerState === "overtime"
    ? `+${overtime}s`
    : `${timeLeft}s`

  const statusMessage = {
    idle:     { title: "Ready to practice?",        subtitle: "Type your pitch below, then hit start when you're ready." },
    running:  { title: "You're on!",                subtitle: timeLeft <= 5 ? "Wrap it up!" : "Speak clearly and confidently." },
    success:  { title: "Great work!",               subtitle: `You finished with ${timeLeft} second${timeLeft !== 1 ? "s" : ""} to spare.` },
    overtime: { title: `${overtime}s over time`,    subtitle: "Try trimming your pitch a little and go again." },
  }[timerState]

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto px-6 py-24 flex flex-col gap-12"
      >
        {/* Header */}
        <motion.div variants={fadeUpItem} className="text-center flex flex-col gap-3">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Networking Tool
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl">
            Elevator <span className="text-brand-gradient">Pitch Timer</span>
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            You've got 30 seconds to make an impression. Practise until it feels
            effortless.
          </p>
        </motion.div>

        {/* Timer */}
        <motion.div variants={fadeUpItem} className="flex flex-col md:flex-row gap-8 items-start">

		{/* Timer — left */}
		<div className="flex flex-col items-center gap-6 shrink-0 w-1/3">
			<div className="relative">
			<svg width="160" height="160" viewBox="0 0 160 160">
				<circle
				cx="80" cy="80" r="54"
				fill="none"
				stroke="currentColor"
				strokeWidth="10"
				className="text-muted"
				/>
				<circle
				cx="80" cy="80" r="54"
				fill="none"
				stroke={arcColor}
				strokeWidth="10"
				strokeLinecap="round"
				strokeDasharray={circumference}
				strokeDashoffset={strokeOffset}
				style={{
					transformOrigin: "center",
					rotate: "-90deg",
					transition: timerState === "running"
					? "stroke-dashoffset 1s linear, stroke 0.5s ease"
					: "stroke 0.5s ease",
				}}
				/>
			</svg>

			<div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
				<AnimatePresence mode="wait">
				<motion.span
					key={displayTime}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -6 }}
					transition={{ duration: 0.15 }}
					className="font-heading font-extrabold text-3xl tabular-nums"
					style={{ color: arcColor }}
				>
					{displayTime}
				</motion.span>
				</AnimatePresence>
				<span className="text-xs text-muted-foreground uppercase tracking-widest">
				{timerState === "overtime" ? "overtime" : "seconds"}
				</span>
			</div>
			</div>

			{/* Status */}
			<AnimatePresence mode="wait">
			<motion.div
				key={timerState}
				initial={{ opacity: 0, y: 6 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -6 }}
				transition={{ duration: 0.2 }}
				className="text-center flex flex-col gap-1"
			>
				<p className="font-heading font-bold text-lg">{statusMessage.title}</p>
				<p className="text-sm text-muted-foreground">{statusMessage.subtitle}</p>
			</motion.div>
			</AnimatePresence>

			{/* Controls */}
			<div className="flex items-center gap-3">
			{timerState === "idle" && (
				<Button
				onClick={start}
				className="bg-brand-gradient text-white border-0 hover:opacity-90 transition-opacity"
				size="lg"
				>
				<Play className="size-4 mr-2" /> Start
				</Button>
			)}
			{timerState === "running" && (
				<Button onClick={stop} variant="outline" size="lg">
				<Square className="size-4 mr-2" /> Stop
				</Button>
			)}
			{(timerState === "success" || timerState === "overtime") && (
				<Button
				onClick={reset}
				className="bg-brand-gradient text-white border-0 hover:opacity-90 transition-opacity"
				size="lg"
				>
				<RotateCcw className="size-4 mr-2" /> Try Again
				</Button>
			)}
			</div>
		</div>

		{/* Pitch input — right */}
		<div className="flex flex-col gap-3 flex-1 w-full">
			<div className="flex items-center gap-2">
			<Mic className="size-4 text-muted-foreground" />
			<p className="font-heading font-semibold text-sm">Your Pitch</p>
			<span className="text-xs text-muted-foreground ml-auto">
				{pitch.length} characters
			</span>
			</div>
			<Textarea
			placeholder="Hi, I'm [name], a [year] [degree] student at QUT. I'm passionate about [interest] and have been working on [project/experience]. I'm looking for [internship/grad role/advice] in [field]..."
			value={pitch}
			onChange={(e) => setPitch(e.target.value)}
			className="resize-none flex-1"
			style={{ minHeight: "260px" }}
			/>
			<p className="text-xs text-muted-foreground">
			Use this as a script to practise from — aim for something that
			sounds natural when spoken, not read.
			</p>
		</div>

		</motion.div>

        {/* Tips */}
        <motion.div variants={fadeUpItem} className="flex flex-col gap-4">
          <p className="font-heading font-semibold text-sm">Tips for a great pitch</p>
          <ul className="flex flex-col gap-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span
                  className="font-heading font-bold text-xs shrink-0 mt-0.5 h-5 w-5 rounded-full flex items-center justify-center text-white bg-brand-gradient"
                >
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}
