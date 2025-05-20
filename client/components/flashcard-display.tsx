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

export function FlashcardDisplay() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [hasCards, setHasCards] = useState(true) // In a real app, this would be false until cards are generated
  const [flipping, setFlipping] = useState(false)

  const handleNext = () => {
    if (currentCard < demoFlashcards.length - 1) {
      setCurrentCard(currentCard + 1)
      setShowAnswer(false)
    }
  }

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
      setShowAnswer(false)
    }
  }

  const toggleAnswer = () => {
    setFlipping(true)
    setTimeout(() => {
      setShowAnswer(!showAnswer)
      setFlipping(false)
    }, 150)
  }

  if (!hasCards) {
    return (
      <div className="text-center py-16 text-pencil-lead/70">
        <p>Upload a PDF to generate flashcards</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-serif font-semibold mb-6 text-pencil-lead flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-pencil-lead" />
        <span>Your Flashcards</span>
      </h2>

      <Card className="mb-6 h-72 bg-index-card border border-notebook-line shadow-sm overflow-hidden relative">
        {/* Lined paper background */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_23px,#E7E7E7_24px)] bg-[size:100%_24px]"></div>

        <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
          <div
            className={cn(
              "flex-1 flex items-center justify-center transition-all duration-300 transform",
              flipping ? "scale-95 opacity-0" : "scale-100 opacity-100",
            )}
          >
            <div className="text-center max-w-2xl">
              {!showAnswer ? (
                <div className="text-2xl font-handwritten font-bold text-pencil-lead">
                  {demoFlashcards[currentCard].question}
                </div>
              ) : (
                <div className="text-xl font-handwritten text-pencil-lead">{demoFlashcards[currentCard].answer}</div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={toggleAnswer}
              className="border-notebook-line text-pencil-lead hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {showAnswer ? "Show Question" : "Show Answer"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-sm text-pencil-lead/70 bg-gray-100 px-3 py-1 rounded-full">
          Card {currentCard + 1} of {demoFlashcards.length}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentCard === 0}
            className="border-notebook-line text-pencil-lead hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentCard === demoFlashcards.length - 1}
            className="border-notebook-line text-pencil-lead hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
