"use client";

import { FileUpload } from "@/components/file-upload"
import { FlashcardDisplay } from "@/components/flashcard-display"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DemoAnimation } from './components/demo-animation'
import './demo.css'
import React, { useState } from 'react';

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
      <Hero onWatchDemo={startDemo} />
      <div className="container mx-auto px-4 py-12 flex-1 max-w-5xl">
        <FileUpload />
        <FlashcardDisplay />
      </div>
      <Features />
      <HowItWorks />
      <div style={{ background: 'red', color: 'white', padding: 20, fontSize: 24, textAlign: 'center' }}>
        PAGE TEST MARKER
      </div>
      <Footer />
      <div className="container mx-auto px-4 demo-animation-section">
        <DemoAnimation isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
    </main>
  )
}
