// src/components/SessionModal.tsx
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { type ScheduleItem, sessionTypeLabels } from "@/data/schedule"
import { type Speaker, speakers } from "@/data/speakers"

const sessionTypeColors: Record<string, string> = {
  social:     "bg-brand-purple/10 text-brand-purple border-brand-purple/20",
  talk:       "bg-brand-pink/10 text-brand-pink border-brand-pink/20",
  qa:         "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
  networking: "bg-brand-purple/10 text-brand-purple border-brand-purple/20",
  break:      "bg-muted text-muted-foreground border-border",
}

interface SessionModalProps {
  item: ScheduleItem | null
  open: boolean
  onClose: () => void
}

export function SessionModal({ item, open, onClose }: SessionModalProps) {
  if (!item) return null

  const sessionSpeakers = item.speakers
	?.map((id) => speakers.find((s) => s.id === id))
	.filter((s): s is Speaker => s !== undefined)
	.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-2xl!">
        <DialogHeader className="gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={`text-xs ${sessionTypeColors[item.type]}`}
            >
              {sessionTypeLabels[item.type]}
            </Badge>
            <span className="text-xs text-muted-foreground tabular-nums">
              {item.time}
              {item.durationMins && ` · ${item.durationMins} mins`}
            </span>
          </div>
          <DialogTitle className="font-heading text-xl text-left">
            {item.title}
          </DialogTitle>
          {item.description && (
            <DialogDescription className="text-sm text-muted-foreground text-left">
              {item.description}
            </DialogDescription>
          )}
        </DialogHeader>

        {sessionSpeakers && sessionSpeakers.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-3">
              <p className="font-heading font-semibold text-sm">
                {sessionSpeakers.length === 1 ? "Speaker" : "Speakers"}
              </p>
              <div className="flex flex-col gap-2">
                {sessionSpeakers.map((speaker) => (
					<Link
						key={speaker!.id}
						to={`/speaker/${speaker!.id}`}
						onClick={onClose}
						className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/30 transition-all group"
					>
						<img
						src={speaker!.photo}
						alt={speaker!.name}
						className="h-10 w-10 rounded-full object-cover object-top shrink-0"
						/>
						<div className="flex flex-col gap-0.5 flex-1 min-w-0">
						<span className="font-heading font-semibold text-sm wrap-break-wordx">
							{speaker!.name}
						</span>
						<span className="text-xs text-muted-foreground wrap-break-word">
							{speaker!.title}
						</span>
						<span className="text-xs text-muted-foreground wrap-break-word">
							{speaker!.company}
						</span>
						</div>
						<ArrowRight className="size-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
					</Link>
				))}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
