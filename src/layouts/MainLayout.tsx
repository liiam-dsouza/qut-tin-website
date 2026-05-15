import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { useTheme } from "@/hooks/useTheme"

export function MainLayout() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Outlet />
      </main>
      <Footer theme={theme} />
    </>
  )
}
