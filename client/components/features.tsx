import type React from "react"
import { BookOpen, Clock, FileText, Layers, Sparkles, Zap } from "lucide-react"

export function Features() {
  return (
    <section className="py-16 border-b border-notebook-line bg-white blocky-section blocky-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-gray-100 px-4 py-1.5 rounded-full text-sm font-medium text-pencil-lead mb-4">
            FEATURES
          </div>
          <h2 className="heading-handwritten mb-8 text-center text-pencil-lead">Transform How You Learn</h2>
          <p className="text-lg text-pencil-lead/80 max-w-2xl mx-auto">
            Our AI-powered platform makes studying efficient and effective with these powerful features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<BookOpen />}
            title="AI-Powered Extraction"
            description="Our advanced AI identifies key concepts and important information from any PDF or textbook"
            color="apple"
          />
          <FeatureCard
            icon={<Clock />}
            title="Save Study Time"
            description="Reduce study time by up to 95% with automatically generated flashcards from your materials"
            color="chalk"
          />
          <FeatureCard
            icon={<Layers />}
            title="Custom Categories"
            description="Automatically organizes flashcards into logical categories and subjects for better learning"
            color="pencil"
          />
          <FeatureCard
            icon={<Zap />}
            title="Instant Generation"
            description="Get your flashcards in seconds, not hours, so you can start studying right away"
            color="apple"
          />
          <FeatureCard
            icon={<FileText />}
            title="Multiple Formats"
            description="Support for PDFs, textbooks, research papers, and lecture notes in various formats"
            color="chalk"
          />
          <FeatureCard
            icon={<Sparkles />}
            title="Smart Review"
            description="Intelligent review system that adapts to your learning patterns for maximum retention"
            color="pencil"
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: "apple" | "chalk" | "pencil"
}) {
  return (
    <div className="p-6 bg-white border blocky-card">
      <div className={`${color} p-3 rounded-full inline-block mb-4`}>{icon}</div>
      <h3 className="text-xl font-serif font-bold mb-2 text-pencil-lead">{title}</h3>
      <p className="text-pencil-lead/80">{description}</p>
    </div>
  )
}
