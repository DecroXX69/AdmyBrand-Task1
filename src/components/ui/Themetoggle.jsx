import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const [mode, setMode] = useState(() => document.documentElement.classList.contains("dark") ? "dark" : "light")
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark")
  }, [mode])
  const toggle = () => setMode(mode === "light" ? "dark" : "light")
  return (
    <motion.div whileHover={{ scale: 1.08 }}>
      <Button variant="ghost" size="icon" onClick={toggle} className="relative">
        <Sun className="h-5 w-5 transition-all dark:scale-0" />
        <Moon className="absolute h-5 w-5 transition-all scale-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
