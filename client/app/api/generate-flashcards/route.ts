import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Simple flashcard generation algorithm
    const flashcards = generateFlashcardsFromText(text);

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json(
      { error: 'Failed to generate flashcards' },
      { status: 500 }
    );
  }
}

function generateFlashcardsFromText(text: string): Array<{ question: string; answer: string }> {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const flashcards: Array<{ question: string; answer: string }> = [];
  
  // Method 1: Look for question-answer patterns
  for (let i = 0; i < lines.length - 1; i++) {
    const currentLine = lines[i].trim();
    const nextLine = lines[i + 1].trim();
    
    // Check if current line looks like a question
    if (isQuestion(currentLine) && nextLine && !isQuestion(nextLine)) {
      flashcards.push({
        question: currentLine,
        answer: nextLine
      });
      i++; // Skip the next line since we used it as answer
    }
  }
  
  // Method 2: If no questions found, try to create Q&A from sentence pairs
  if (flashcards.length === 0) {
    for (let i = 0; i < lines.length - 1; i += 2) {
      if (lines[i] && lines[i + 1]) {
        flashcards.push({
          question: lines[i].trim(),
          answer: lines[i + 1].trim()
        });
      }
    }
  }
  
  // Method 3: If still no cards, create cards from individual sentences
  if (flashcards.length === 0) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    for (let i = 0; i < sentences.length - 1; i += 2) {
      if (sentences[i] && sentences[i + 1]) {
        flashcards.push({
          question: sentences[i].trim(),
          answer: sentences[i + 1].trim()
        });
      }
    }
  }
  
  return flashcards;
}

function isQuestion(text: string): boolean {
  const questionWords = ['what', 'when', 'where', 'who', 'why', 'how', 'which', 'whose', 'whom'];
  const lowerText = text.toLowerCase();
  
  // Check if it starts with a question word
  if (questionWords.some(word => lowerText.startsWith(word))) {
    return true;
  }
  
  // Check if it ends with a question mark
  if (text.trim().endsWith('?')) {
    return true;
  }
  
  // Check if it's a short sentence that could be a question
  if (text.length < 100 && lowerText.includes('is') || lowerText.includes('are')) {
    return true;
  }
  
  return false;
} 