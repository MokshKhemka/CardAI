"use client";

import { FileUpload } from "@/components/file-upload"
import FlashcardDisplay from "@/components/flashcard-display"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import './demo.css'
import React, { useState } from 'react';

// example flashcards
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

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const startDemo = () => {
    setIsPlaying(true);
    const demoSection = document.querySelector('.demo-animation-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <main className="min-h-screen flex flex-col bg-notebook-paper text-pencil-lead">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-12 flex-1 max-w-5xl">
        <FileUpload />
        <FlashcardDisplay flashcards={demoFlashcards} />
      </div>
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}
