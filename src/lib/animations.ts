import type { Variants } from "framer-motion"

export const fadeUpContainer: Variants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.15 },
	},
}

export const fadeUpItem: Variants = {
  	hidden: { opacity: 0, y: 16 },
  	show:  { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
}
