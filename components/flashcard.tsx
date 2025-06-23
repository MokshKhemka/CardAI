import React from "react";

interface FlashcardProps {
  question: string;
  answer: string;
  flipped: boolean;
  onFlip: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ question, answer, flipped, onFlip }) => {
  return (
    <div className="flashcard-outer" onClick={onFlip} style={{ cursor: 'pointer' }}>
      <div className={`flashcard-inner${flipped ? ' flipped' : ''}`}>
        <div className="flashcard-front">
          <div className="text-xl font-bold mb-2">Q:</div>
          <div>{question}</div>
        </div>
        <div className="flashcard-back">
          <div className="text-xl font-bold mb-2">A:</div>
          <div>{answer}</div>
        </div>
      </div>
    </div>
  );
}
