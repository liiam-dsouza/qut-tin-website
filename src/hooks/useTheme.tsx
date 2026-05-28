import { useEffect, useState } from "react"

type Theme = "light" | "dark"

function getStoredTheme(): Theme {
  try {
    return (localStorage.getItem("tin-theme") as Theme) ?? "dark"
  } catch {
    return "dark"
  }
}

function setStoredTheme(theme: Theme) {
  try {
    localStorage.setItem("tin-theme", theme)
  } catch {
	console.log("Hi Ethan! I found the reason your browser is being special...")
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.setAttribute("data-theme", theme)
    setStoredTheme(theme)

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute(
        "content",
        theme === "dark" ? "#0D0F1A" : "#F1F1F1"
      )
    }
  }, [theme])

  return {
    theme,
    toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")),
  }
}
