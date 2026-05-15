import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(() => {
		return (localStorage.getItem("tin-theme") as Theme) ?? "dark"
	})

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark")
		localStorage.setItem("tin-theme", theme)
	}, [theme])

	return {
		theme,
		toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")),
	}
}
