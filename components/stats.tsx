import type React from "react"
import { Brain, Clock, FileText, Users } from "lucide-react"

export function Stats() {
  return (
    <div className="border-b border-[#1e2030] bg-[#0f1118]/50 backdrop-blur-sm">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem icon={<FileText className="h-6 w-6 text-teal-400" />} value="500,000+" label="PDFs Processed" />
          <StatItem
            icon={<Brain className="h-6 w-6 text-amber-400" />}
            value="10 Million+"
            label="Flashcards Generated"
          />
          <StatItem icon={<Users className="h-6 w-6 text-teal-400" />} value="50,000+" label="Active Users" />
          <StatItem icon={<Clock className="h-6 w-6 text-amber-400" />} value="95%" label="Time Saved Studying" />
        </div>
      </div>
    </div>
  )
}

function StatItem({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-[#1e2030]/50 border border-[#2a2d3d] hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(20,184,166,0.15)]">
      <div className="bg-[#2a2d3d] p-3 rounded-lg mb-4">{icon}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  )
}
