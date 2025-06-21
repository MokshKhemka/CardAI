import { ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative py-16 overflow-hidden border-b border-notebook-line bg-white" id="hero">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_90%,rgba(79,70,229,0.1)_100%)]"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-apple-red p-3 rounded-full">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-handwritten font-bold ml-4 text-pencil-lead">CardAI</h1>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 max-w-4xl mx-auto leading-tight text-pencil-lead">
          Transform <span className="text-apple-red">PDFs</span> into{" "}
          <span className="text-chalkboard-green">Flashcards</span> with AI
        </h2>

        <p className="text-xl text-pencil-lead/80 max-w-2xl mx-auto leading-relaxed mb-8">
          Upload any textbook or PDF and our AI will instantly create customized flashcards to accelerate your learning
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-chalkboard-green hover:bg-chalkboard-green/90 text-white border-0 text-lg px-8 py-6 h-auto">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
//testing wakatime 