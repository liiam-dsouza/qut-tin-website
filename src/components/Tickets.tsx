import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { tickets } from "@/data/tickets"
import { Separator } from "@/components/ui/separator"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"

function Tickets() {
  return (
    <section id="tickets" className="py-24 px-6">
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
            Secure Your Spot
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            Choose Your Path
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join us for the most anticipated tech night of the year.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={fadeUpContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {tickets.map((tier) => (
            <motion.div
              key={tier.id}
              variants={fadeUpItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative"
            >
              {tier.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-brand-gradient text-white border-0">
                  Most Popular
                </Badge>
              )}
              <Card
                className={`flex flex-col h-full transition-all duration-300 ${
                  tier.highlighted
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5"
                }`}
              >
                <CardHeader className="flex flex-col gap-2">
                  <CardTitle className="font-heading text-xl">{tier.name}</CardTitle>
                  <div className="flex items-end gap-1">
                    {tier.price !== null ? (
                      <>
                        <span className="font-heading font-bold text-4xl">
                          ${tier.price}
                        </span>
                        <span className="text-muted-foreground text-sm mb-1">AUD</span>
                      </>
                    ) : (
                      <span className="font-heading font-bold text-2xl">
                        {tier.priceLabel}
                      </span>
                    )}
                  </div>
                  {tier.description && (
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  )}
                </CardHeader>

                <Separator />

                <CardContent className="flex flex-col flex-1 gap-6 pt-6">
                  <ul className="flex flex-col gap-2 flex-1">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      tier.highlighted
                        ? "bg-brand-gradient text-white border-0 hover:opacity-90"
                        : ""
                    }`}
                    variant={tier.highlighted ? "default" : "outline"}
                  >
					 <a
                      href={tier.ctaHref}
                      target={tier.ctaHref.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                    >
                      {tier.ctaLabel}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Tickets
