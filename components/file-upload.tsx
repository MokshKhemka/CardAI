"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Upload, FileText, Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function FileUpload() {
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState<{ question: string; answer: string }[]>([]);
  const [generatingCards, setGeneratingCards] = useState(false);

  const exampleText = `What is the capital of France?
Paris is the capital and largest city of France.

What is the largest planet in our solar system?
Jupiter is the largest planet in our solar system.

What is the chemical symbol for gold?
Au is the chemical symbol for gold.

What year did World War II end?
World War II ended in 1945.

What is the main component of the sun?
The sun is primarily composed of hydrogen gas.`;

  const generateFlashcards = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== "");
    const cards: { question: string; answer: string }[] = [];
    for (let i = 0; i < lines.length; i += 2) {
      if (lines[i] && lines[i+1]) {
        cards.push({ question: lines[i], answer: lines[i+1] });
      } else if (lines[i]) {
        cards.push({ question: lines[i], answer: "No answer found" });
      }
    }
    setFlashcards(cards);
  };

  const handleGenerateFromText = async () => {
    if (!inputText.trim()) return;
    setGeneratingCards(true);
    try {
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });
      if (response.ok) {
        const data = await response.json();
        setFlashcards(data.flashcards);
      } else {
        generateFlashcards(inputText);
      }
    } catch (error) {
      generateFlashcards(inputText);
    } finally {
      setGeneratingCards(false);
    }
  };

  const handleClearText = () => {
    setInputText("");
    setFlashcards([]);
  };

  return (
    <div className="blocky-card text-black">
      <div className="blocky-content w-full mb-6">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">ENTER YOUR TEXT (OR USE THE EXAMPLE BELOW):</label>
          <textarea
            className="blocky-input w-full h-60 resize-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here or edit the example text below..."
          />
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={handleGenerateFromText}
            disabled={generatingCards || !inputText.trim()}
            className="blocky-button bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400 disabled:text-gray-600"
          >
            {generatingCards ? "GENERATING..." : "GENERATE FLASHCARDS"}
          </button>
          <button
            onClick={handleClearText}
            className="blocky-button bg-red-600 hover:bg-red-700 text-white"
          >
            CLEAR TEXT
          </button>
        </div>
        <div className="mt-4">
          <button
            onClick={() => setInputText(exampleText)}
            className="blocky-button bg-purple-600 hover:bg-purple-700 text-white"
          >
            USE EXAMPLE TEXT
          </button>
        </div>
      </div>
      {flashcards.length > 0 && (
        <div className="blocky-content w-full mt-8">
          <h3 className="text-lg font-bold mb-4">GENERATED FLASHCARDS</h3>
          <ul className="space-y-4">
            {flashcards.map((card, idx) => (
              <li key={idx} className="p-4 border rounded bg-gray-50">
                <strong>Q:</strong> {card.question}<br />
                <strong>A:</strong> {card.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
