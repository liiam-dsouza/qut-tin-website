import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"

import { MainLayout } from "@/layouts/MainLayout"

import Home from "@/pages/index"
import SpeakerProfile from "@/pages/speakerProfile"
import Sponsors from "@/pages/sponsorsPage"
import Team from "@/pages/team"
import Tickets from "@/pages/tickets"
import Terms from "@/pages/terms"
import Privacy from "@/pages/privacy"
import QRGenerator from "@/pages/qrCodeGenerator"
import ElevatorPitch from "./pages/elevatorPitch"
import Gallery from "./pages/gallery"


function App() {
	return (
		<BrowserRouter>
			<HelmetProvider>
				<Routes>
					<Route element={<MainLayout />}>
						<Route index element={<Home />} />
						<Route path="/speaker/:id" element={<SpeakerProfile />} />
						{/* <Route path="/sponsors" element={<Sponsors />} />
						<Route path="/team" element={<Team />} /> */}
						<Route path="/gallery" element={<Gallery />} />
						<Route path="/qr-generator" element={<QRGenerator />} />
						<Route path="/elevator-pitch" element={<ElevatorPitch />} />
						<Route path="/tickets" element={<Tickets />} />
						<Route path="/terms" element={<Terms />} />
						<Route path="/privacy" element={<Privacy />} />
					</Route>
				</Routes>
			</HelmetProvider>
		</BrowserRouter>
	)
}

export default App
