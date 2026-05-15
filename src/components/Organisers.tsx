// src/components/sections/Organisers.tsx
import { motion } from "framer-motion"
import { organisers } from "@/data/organisers"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"
import { IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react"

function Organisers() {
  return (
    <section className="py-24 px-6 bg-muted/30">
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
            Powering the Event
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            Meet the Organisers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            This event is curated for students, by students.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={fadeUpContainer}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {organisers.map((org) => (
            <motion.div
              key={org.id}
              variants={fadeUpItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center gap-3 text-center"
            >
              {/* Logo tile */}
              <div className="size-30 rounded-xl overflow-hidden bg-neutral-100 border border-border flex items-center justify-center p-3 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5">
                <img
                  src={org.logo}
                  alt={org.name}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Name */}
              <p className="text-xs text-muted-foreground leading-tight group-hover:text-foreground transition-colors duration-300">
                {org.name}
              </p>

			  {(org.linkedin || org.instagram) && (
				<div className="flex items-center gap-1">
					{org.linkedin && (
					<a
						href={org.linkedin}
						target="_blank"
						rel="noreferrer"
						aria-label={`${org.name} on LinkedIn`}
						className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
					>
						<IconBrandLinkedin className="size-4" />
					</a>
					)}
					{org.instagram && (
					<a
						href={org.instagram}
						target="_blank"
						rel="noreferrer"
						aria-label={`${org.name} on Instagram`}
						className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-brand-pink hover:bg-brand-pink/10 transition-colors"
					>
						<IconBrandInstagram className="size-4" />
					</a>
					)}
				</div>
				)}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Organisers
