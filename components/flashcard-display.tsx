"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Sample cards - in real app, these would come from your API
const demoFlashcards = [
  {
    id: 1,
    question: "Why is the sky blue?",
    answer: "The sky appears blue because molecules in the air scatter blue light from the sun more than they scatter red light.",
  },
  {
    id: 2,
    question: "What is the speed of light?",
    answer: "The speed of light in a vacuum is approximately 299,792 kilometers per second (186,282 miles per second).",
  },
  {
    id: 3,
    question: "Who wrote 'To Kill a Mockingbird'?",
    answer: "Harper Lee is the author of 'To Kill a Mockingbird', published in 1960.",
  },
  {
    id: 4,
    question: "What is the powerhouse of the cell?",
    answer: "The mitochondrion is often referred to as the powerhouse of the cell because it produces energy.",
  },
  {
    id: 5,
    question: "What is the capital of Japan?",
    answer: "Tokyo is the capital city of Japan.",
  },
]

export function FlashcardDisplay() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [hasCards, setHasCards] = useState(true)
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
      <div className="text-center py-8 text-gray-500">
        <p>Drop a PDF to make some cards</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-gray-600" />
        <span>Your Cards</span>
      </h2>

      <Card className="mb-4 h-64 bg-white border border-gray-200 shadow-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_23px,#f0f0f0_24px)] bg-[size:100%_24px]"></div>

        <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">
          <div
            className={cn(
              "flex-1 flex items-center justify-center transition-all duration-300 transform",
              flipping ? "scale-95 opacity-0" : "scale-100 opacity-100",
            )}
          >
            <div className="text-center max-w-2xl">
              {!showAnswer ? (
                <div className="text-xl font-medium text-gray-800">
                  {demoFlashcards[currentCard].question}
                </div>
              ) : (
                <div className="text-lg text-gray-700">{demoFlashcards[currentCard].answer}</div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={toggleAnswer}
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {showAnswer ? "Show Question" : "Show Answer"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {currentCard + 1} of {demoFlashcards.length}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentCard === 0}
            className="border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentCard === demoFlashcards.length - 1}
            className="border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
