// src/hooks/useTheme.ts
import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("tin-theme") as Theme) ?? "dark"
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("tin-theme", theme)

    // Update theme-color meta tag to match
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
