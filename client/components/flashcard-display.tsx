"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// This would normally come from your API after processing the PDF
const demoFlashcards = [
  {
    id: 1,
    question: "What is the law of conservation of energy?",
    answer: "Energy cannot be created or destroyed, only transformed from one form to another.",
  },
  {
    id: 2,
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    id: 3,
    question: "What is photosynthesis?",
    answer:
      "The process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water.",
  },
]

// Flashcard component to display question and answer
const Flashcard = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flashcard ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">
          {front}
        </div>
        <div className="flashcard-back">
          {back}
        </div>
      </div>
    </div>
  )
}

// Flashcard display component
const FlashcardDisplay = ({ flashcards }) => {
  return (
    <div className="blocky-card flex flex-col items-center">
      <h2 className="heading-handwritten mb-4 text-pencil-lead">
        Flashcards
      </h2>
      <div className="flashcard-container">
        {flashcards.map((card, index) => (
          <Flashcard key={index} front={card.question} back={card.answer} />
        ))}
      </div>
    </div>
  )
}

export default FlashcardDisplay
