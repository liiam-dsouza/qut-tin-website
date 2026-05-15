import { BrowserRouter, Route, Routes } from "react-router-dom"

import { MainLayout } from "@/layouts/MainLayout"

import Home from "@/pages/index"
import SpeakerProfile from "@/pages/speakerProfile"
import Sponsors from "@/pages/sponsorsPage"
import Tickets from "@/pages/tickets"
import Terms from "@/pages/terms"
import Privacy from "@/pages/privacy"


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="/speaker/:id" element={<SpeakerProfile />} />
					<Route path="/sponsors" element={<Sponsors />} />
					<Route path="/tickets" element={<Tickets />} />
					<Route path="/terms" element={<Terms />} />
					<Route path="/privacy" element={<Privacy />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
