import Link from "next/link"
import { BookOpen, Github, Instagram, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-white text-pencil-lead border-t border-notebook-line">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-apple-red p-2 rounded-full mr-2">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-handwritten font-bold text-lg">CardAI</span>
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
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-pencil-lead/70 hover:text-apple-red transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-pencil-lead/70 hover:text-apple-red transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-pencil-lead/70 hover:text-apple-red transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-pencil-lead/70 hover:text-apple-red transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-medium text-pencil-lead mb-2">Subscribe to our newsletter</h4>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:border-apple-red"
            />
            <Button className="bg-apple-red hover:bg-apple-red/90 text-white border-0">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </footer>
  )
}
