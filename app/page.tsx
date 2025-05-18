import { FileUpload } from "@/components/file-upload"
import { FlashcardDisplay } from "@/components/flashcard-display"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-notebook-paper text-pencil-lead">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-12 flex-1 max-w-5xl">
        <FileUpload />
        <FlashcardDisplay />
      </div>
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}
