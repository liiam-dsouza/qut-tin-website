import SEO from "@/components/SEO"
import Hero from "@/components/Hero"
import ValueProps from "@/components/ValueProps"
import Speakers from "@/components/Speakers"
import Organisers from "@/components/Organisers"
import Schedule from "@/components/Schedule"
import NetworkingGuide from "@/components/NetworkingGuide"
import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"
import Tickets from "@/components/Tickets"

function Home() {
  	return(
		<>
			<SEO url="/" />
			<Hero />
			<ValueProps />
			<Schedule />
			<Speakers />
			<Organisers />
			<NetworkingGuide />
			<Testimonials />
			<FAQ />
			<Tickets />
		</>
	)
}

export default Home
