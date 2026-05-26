import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Small delay to allow the page to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""))
        if (element) {
          element.scrollIntoView({ behavior: "auto" })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [pathname, hash])

  return null
}
