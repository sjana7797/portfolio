"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Download, Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        {/* Monogram */}
        <Link
          href="/"
          className="font-mono text-[11px] font-bold h-7 w-7 rounded bg-primary text-primary-foreground flex items-center justify-center shrink-0 tracking-tight hover:bg-primary/90 transition-colors"
        >
          SJ
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative px-3.5 py-1.5 text-sm transition-colors duration-150",
                pathname === href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
              {pathname === href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-2 -bottom-[calc(0.875rem+1px)] h-px bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a href="/resume.pdf" download className={cn(buttonVariants({
              variant: "outline",
              size: "sm",
              className:"hidden sm:flex gap-1.5 h-8 text-xs border-border/60 hover:border-primary/50 transition-colors"
          }))}>
              <Download className="h-3 w-3" />
              Resume
            </a>
  
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-3 py-2 text-sm rounded-md transition-colors",
                      pathname === href
                        ? "text-foreground font-medium bg-accent/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/30",
                    )}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: links.length * 0.04 }}
              >
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors mt-1"
                  onClick={() => setOpen(false)}
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
