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
    <div className="flashcard-container">
      {flashcards.map((card, index) => (
        <Flashcard key={index} front={card.question} back={card.answer} />
      ))}
    </div>
  )
}

export default FlashcardDisplay

// Add styles for flashcards
const styles = `
.flashcard-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.flashcard {
  width: 200px;
  height: 150px;
  perspective: 1000px;
  cursor: pointer;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front, .flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.flashcard-back {
  background-color: #f8f9fa;
  color: #333;
  transform: rotateY(180deg);
}

.flashcard-front {
  background-color: #fff;
  color: #333;
}
`

// Inject styles into the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.type = 'text/css'
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}
