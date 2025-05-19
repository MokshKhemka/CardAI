import { Star } from "lucide-react"

export function Testimonials() {
  return (
    <section className="py-20 border-b border-[#1e2030]" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#1e2030] px-4 py-1.5 rounded-full text-sm font-medium text-teal-400 mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of students who have transformed their study habits with CardAI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            name="Alex Johnson"
            role="Medical Student"
            image="/placeholder.svg?height=80&width=80"
            quote="CardAI helped me prepare for my medical exams in half the time. The flashcards extracted exactly what I needed to know."
            rating={5}
          />
          <TestimonialCard
            name="Sarah Williams"
            role="Law Student"
            image="/placeholder.svg?height=80&width=80"
            quote="I uploaded my law textbooks and got perfectly organized flashcards. This tool is a game-changer for memorizing cases."
            rating={5}
          />
          <TestimonialCard
            name="Michael Chen"
            role="Computer Science Major"
            image="/placeholder.svg?height=80&width=80"
            quote="As a CS student, I need to remember a lot of concepts. CardAI makes it easy to create flashcards from technical PDFs."
            rating={4}
          />
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  name,
  role,
  image,
  quote,
  rating,
}: {
  name: string
  role: string
  image: string
  quote: string
  rating: number
}) {
  return (
    <div className="p-6 rounded-xl bg-[#1e2030]/50 border border-[#2a2d3d] hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)]">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gradient-to-br from-teal-500 to-amber-500 p-0.5">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full rounded-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>

      <p className="text-gray-300 mb-4">"{quote}"</p>

      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}`} />
        ))}
      </div>
    </div>
  )
}
