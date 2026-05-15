import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/data/faq"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"

function FAQ() {
  return (
    <section id="faq" className="py-24 px-6">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-2xl mx-auto flex flex-col gap-16"
      >
        {/* Heading */}
        <motion.div variants={fadeUpItem} className="text-center flex flex-col gap-3">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Be In The Know
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl">FAQs</h2>
          <p className="text-muted-foreground">
            Everything you need to know before you arrive.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div variants={fadeUpContainer} className="flex flex-col gap-2">
          <Accordion className="flex flex-col gap-2">
            {faqs.map((faq) => (
              <motion.div key={faq.id} variants={fadeUpItem}>
                <AccordionItem value={faq.id} className="border rounded-lg px-4">
                  <AccordionTrigger className="font-heading font-semibold text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default FAQ
