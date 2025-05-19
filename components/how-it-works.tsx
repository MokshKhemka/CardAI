import { ArrowRight } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="py-16 border-b border-notebook-line bg-notebook-paper" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-gray-100 px-4 py-1.5 rounded-full text-sm font-medium text-pencil-lead mb-4">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4 text-pencil-lead">How CardAI Works</h2>
          <p className="text-lg text-pencil-lead/80 max-w-2xl mx-auto">
            Three simple steps to transform your study materials into effective flashcards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StepCard
            number={1}
            title="Upload Your PDF"
            description="Simply upload any PDF, textbook, or study material to our platform"
          />
          <StepCard
            number={2}
            title="AI Processing"
            description="Our advanced AI analyzes the content and extracts key concepts and information"
          />
          <StepCard
            number={3}
            title="Study Flashcards"
            description="Review your automatically generated flashcards and start learning efficiently"
          />
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-chalkboard-green hover:bg-chalkboard-green/90 text-white font-medium px-8 py-3 rounded-md transition-colors flex items-center">
            Try It Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="relative p-6 rounded-md bg-white border border-notebook-line shadow-sm">
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-apple-red flex items-center justify-center font-bold text-white">
        {number}
      </div>

      {number < 3 && (
        <div className="absolute top-1/2 -right-4 transform translate-x-0 -translate-y-1/2 hidden md:block z-10">
          <ArrowRight className="h-6 w-6 text-pencil-lead/50" />
        </div>
      )}

      <h3 className="text-xl font-serif font-bold mb-3 text-pencil-lead mt-2">{title}</h3>
      <p className="text-pencil-lead/80">{description}</p>
    </div>
  )
}
