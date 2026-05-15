import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { event } from "@/data/event"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"
import { IconBrandLinkedin, IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react"

interface FooterProps {
  theme: "light" | "dark"
}

export function Footer({ theme }: FooterProps) {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto flex flex-col gap-10"
      >
        <div className="grid sm:grid-cols-3 gap-10">
          {/* Brand */}
          <motion.div variants={fadeUpItem} className="flex flex-col gap-3 items-start">
            <img
              src={theme === "light" ? "/logo-dark.svg" : "/logo-light.svg"}
              alt="TIN Logo"
              className="h-12 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              Tech Industry Night {event.year}. Powered by the STEM clubs of QUT.
            </p>
          </motion.div>

          {/* Event links */}
          <motion.div variants={fadeUpItem} className="flex flex-col gap-3">
            <p className="font-heading font-semibold text-sm">Event</p>
            <div className="flex flex-col gap-2">
              <a href="#schedule" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Schedule
              </a>
              <a href="#speakers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Speakers
              </a>
              <Link to="/tickets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tickets
              </Link>
              {/* <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Gallery
              </Link> */}
              {/* <Link to="/sponsors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sponsors
              </Link> */}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div variants={fadeUpItem} className="flex flex-col gap-3">
            <p className="font-heading font-semibold text-sm">Connect</p>
            <div className="flex flex-col gap-2">
			  <a
                href={`mailto:${event.email.team}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {event.email.team}
              </a>
              <div className="flex items-center gap-2 mt-1">
				<a
                  href={event.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-brand-pink hover:bg-brand-pink/10 transition-colors"
                >
                  <IconBrandInstagram className="size-4" />
                </a>
				<a
                  href={event.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <IconBrandLinkedin className="size-4" />
                </a>
                {event.socials.tiktok && (
				  <a
                    href={event.socials.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="TikTok"
                    className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 transition-colors"
                  >
                    <IconBrandTiktok className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <Separator />

        <motion.div
          variants={fadeUpItem}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground"
        >
          <span>© {event.year} Tech Industry Night. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
