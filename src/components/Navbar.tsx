import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { event } from "@/data/event"

const navLinks = [
	{ label: "Schedule", href: "/#schedule" },
	{ label: "Speakers", href: "/#speakers" },
	{ label: "FAQ", href: "/#faq" },
	{ label: "Tickets", href: "/#tickets" },
	// { label: "Sponsors", href: "/sponsors" },
]

interface NavbarProps {
	theme: "light" | "dark"
	onToggleTheme: () => void
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handler = () => setScrolled(window.scrollY > 20)
		window.addEventListener("scroll", handler)
		return () => window.removeEventListener("scroll", handler)
	}, [])

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
				? "bg-background/80 backdrop-blur-md border-b border-border"
				: "bg-transparent"
			}`}
		>
			<nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-2">
					<img src={theme === "light" ? "/logo-dark.svg" : "/logo-light.svg"} alt="TIN Logo" className="size-12 w-auto" />
					<span className="font-heading font-bold text-lg hidden sm:block">
						Tech Industry Night
					</span>
				</Link>

				{/* Desktop links */}
				<div className="hidden md:flex items-center gap-6">
					{
						navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								{link.label}
							</a>
						))
					}
				</div>

				{/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <Button size="lg" className="hidden md:inline-flex bg-brand-gradient text-white border-0">
            <a href={event.ticketingUrl} target="_blank" rel="noreferrer">
              Get Tickets
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <SheetClose key={link.href}>
					<a
                      href={link.href}
                      className="text-lg font-heading font-semibold hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
                <Separator />
                <Button className="bg-brand-gradient text-white border-0 mx-4">
                  <a href={event.ticketingUrl} target="_blank" rel="noreferrer">
                    Get Tickets
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
			</nav>
		</header>
	)
}

export default Navbar
