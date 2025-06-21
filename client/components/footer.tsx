import Link from "next/link"
import { BookOpen, Github, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white text-pencil-lead border-t border-notebook-line blocky-section blocky-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="heading-handwritten">CardAI</span>
          </div>

          <div className="flex space-x-6">
            <Link href="#" className="text-pencil-lead/70 hover:text-apple-red transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-pencil-lead/70 hover:text-apple-red transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-pencil-lead/70 hover:text-apple-red transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="border-t border-notebook-line mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-pencil-lead/70">© {new Date().getFullYear()} CardAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
