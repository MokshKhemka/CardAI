"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-notebook-line shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="relative mr-2">
              <div className="bg-apple-red p-2 rounded-full">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-handwritten font-bold text-pencil-lead">CardAI</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-pencil-lead hover:text-apple-red transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-pencil-lead hover:text-apple-red transition-colors">
              How It Works
            </Link>
            <Button className="bg-chalkboard-green hover:bg-chalkboard-green/90 text-white border-0">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-white transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none",
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          <Link
            href="#features"
            className="text-xl text-pencil-lead hover:text-apple-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-xl text-pencil-lead hover:text-apple-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Button
            className="bg-chalkboard-green hover:bg-chalkboard-green/90 text-white border-0 w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  )
}
