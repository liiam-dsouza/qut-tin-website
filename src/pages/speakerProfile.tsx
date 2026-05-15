import SEO from "@/components/SEO"
import { useParams, Link, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { speakers } from "@/data/speakers"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"
import { IconBrandLinkedin } from "@tabler/icons-react"

function SpeakerProfile() {
  const { id } = useParams()
  const speaker = speakers.find((s) => s.id === id)

  if (!speaker) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-background mt-16">
		<SEO
			title={`${speaker.name} — Speaker`}
			url={`/speakers/${speaker.id}`}
		/>
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Button variant="ghost" className="-ml-3">
          <Link to="/#speakers" className="flex items-center justify-center">
            <ArrowLeft className="size-4 mr-2" /> Back to Speakers
          </Link>
        </Button>
      </div>

      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12"
      >
        {/* Header */}
        <motion.div variants={fadeUpItem} className="flex flex-col sm:flex-row gap-8 items-start">
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="w-36 h-36 rounded-2xl object-cover object-top shrink-0"
          />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="font-heading font-extrabold text-3xl md:text-4xl">
                {speaker.name}
              </h1>
              <p className="text-muted-foreground">
                {speaker.title} @ {speaker.company}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-1">
              {speaker.linkedin && (
                <Button variant="outline" size="sm">
                  <a href={speaker.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
					<IconBrandLinkedin className="size-4" /> Connect on LinkedIn
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        <Separator />

		{/* Bio */}
		<motion.div variants={fadeUpItem} className="flex flex-col gap-6">
		  <h2 className="font-heading font-bold text-xl">Bio</h2>
		  <div className="flex flex-col gap-4">
			{speaker.bio.map((paragraph, idx) => (
			  <p key={idx} className="text-sm text-muted-foreground">
				{paragraph}
			  </p>
			))}
		  </div>
		</motion.div>

        {/* Other speakers */}
        <motion.div variants={fadeUpItem} className="flex flex-col gap-6">
          <h2 className="font-heading font-bold text-xl">Other Speakers</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {speakers
              .filter((s) => s.id !== speaker.id)
              .map((s) => (
                <Link
                  key={s.id}
                  to={`/speaker/${s.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all group"
                >
                  <img
                    src={s.photo}
                    alt={s.name}
                    className="w-12 h-12 rounded-full object-cover object-top shrink-0"
                  />
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="font-heading font-semibold text-sm truncate">
                      {s.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {s.title}
                    </span>
                  </div>
                  <ArrowLeft className="size-4 text-muted-foreground rotate-180 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SpeakerProfile
