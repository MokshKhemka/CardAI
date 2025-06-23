"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Upload, FileText, Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function FileUpload() {
  const [pdfjs, setPdfjs] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('pdfjs-dist').then(instance => {
        instance.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${instance.version}/pdf.worker.js`;
        setPdfjs(instance);
      });
    }
  }, []);

  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [extractedText, setExtractedText] = useState("")
  const [flashcards, setFlashcards] = useState<{ question: string; answer: string }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const [reviewMode, setReviewMode] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editQuestion, setEditQuestion] = useState("")
  const [editAnswer, setEditAnswer] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [cardStatus, setCardStatus] = useState<Array<"known" | "unknown" | "unseen">>([])
  const [reviewStartTime, setReviewStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [reviewSummary, setReviewSummary] = useState(false)
  const [textInputMode, setTextInputMode] = useState(false)
  const [inputText, setInputText] = useState("")
  const [generatingCards, setGeneratingCards] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedFlashcards = localStorage.getItem('flashcards');
    const savedText = localStorage.getItem('extractedText');
    if (savedFlashcards) setFlashcards(JSON.parse(savedFlashcards));
    if (savedText) setExtractedText(savedText);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);
  useEffect(() => {
    localStorage.setItem('extractedText', extractedText);
  }, [extractedText]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (reviewMode && reviewStartTime && !reviewSummary) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - reviewStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [reviewMode, reviewStartTime, reviewSummary]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setExtractedText("")
      setFlashcards([])
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setExtractedText("")
      setFlashcards([])
    }
  }

  const handleTextExtraction = async () => {
    if (!file || !pdfjs) return;

    setUploading(true);
    setProgress(0);
    setExtractedText("");
    setFlashcards([]);

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const typedArray = new Uint8Array(event.target.result as ArrayBuffer);
        const loadingTask = pdfjs.getDocument(typedArray);
        
        const pdf = await loadingTask.promise;
        let fullText = "";
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText += textContent.items.map((item: any) => item.str).join(" ") + "\n";
          setProgress((i / pdf.numPages) * 100);
        }

        setExtractedText(fullText);
        setUploading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  
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
  }

  const handleCreateFromSelection = () => {
    const textarea = textRef.current;
    let selectedText = "";
    
    if (textarea && textarea.selectionStart !== textarea.selectionEnd) {
      selectedText = textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd
      );
    } else if (textInputMode) {
      // For text input mode, we need to get selection from the input textarea
      const activeElement = document.activeElement;
      if (activeElement && activeElement.tagName === 'TEXTAREA') {
        const textareaElement = activeElement as HTMLTextAreaElement;
        if (textareaElement.selectionStart !== textareaElement.selectionEnd) {
          selectedText = textareaElement.value.substring(
            textareaElement.selectionStart,
            textareaElement.selectionEnd
          );
        }
      }
    }
    
    if (selectedText.trim()) {
      const newCard = { question: selectedText.trim(), answer: "" };
      const newFlashcards = [...flashcards, newCard];
      setFlashcards(newFlashcards);
      setEditingIndex(newFlashcards.length - 1);
      setEditQuestion(newCard.question);
      setEditAnswer(newCard.answer);
    } else {
      alert("Please select some text first!");
    }
  };

  const openFileSelector = () => {
    inputRef.current?.click()
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditQuestion(flashcards[index].question);
    setEditAnswer(flashcards[index].answer);
  };

  const handleSave = (index: number) => {
    const updated = [...flashcards];
    updated[index] = { question: editQuestion, answer: editAnswer };
    setFlashcards(updated);
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    const updated = [...flashcards];
    updated.splice(index, 1);
    setFlashcards(updated);
    if (editingIndex === index) setEditingIndex(null);
  };

  const handleAdd = () => {
    setFlashcards([...flashcards, { question: "", answer: "" }]);
    setEditingIndex(flashcards.length);
    setEditQuestion("");
    setEditAnswer("");
  };

  // Download handlers
  const handleDownloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    const csv = flashcards.map(card => `"${card.question.replace(/"/g, '""')}","${card.answer.replace(/"/g, '""')}"`).join('\n');
    const blob = new Blob([`Question,Answer\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(flashcards, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setReviewSummary(true);
    }
  };

  const handlePrevCard = () => {
    setShowAnswer(false);
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };
  
  const handleMarkCard = (status: 'known' | 'unknown') => {
    const newStatus = [...cardStatus];
    newStatus[currentCard] = status;
    setCardStatus(newStatus);
    handleNextCard();
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!reviewMode || reviewSummary) return;

      if (e.key === 'ArrowRight') handleNextCard();
      if (e.key === 'ArrowLeft') handlePrevCard();
      if (e.key === ' ') {
        e.preventDefault();
        setShowAnswer(s => !s);
      }
      if (e.key === 'k') handleMarkCard('known');
      if (e.key === 'u') handleMarkCard('unknown');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reviewMode, reviewSummary, currentCard, flashcards, cardStatus]);

  const startReview = () => {
    setReviewMode(true);
    setCurrentCard(0);
    setShowAnswer(false);
    setCardStatus(Array(flashcards.length).fill('unseen'));
    setReviewStartTime(Date.now());
    setElapsedTime(0);
    setReviewSummary(false);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const downloadCards = (cardsToDownload: typeof flashcards, filename: string) => {
    if (cardsToDownload.length === 0) {
      alert(`No ${filename.split('_')[0]} cards to download.`);
      return;
    }
    const csv = cardsToDownload.map(card => `"${card.question.replace(/"/g, '""')}","${card.answer.replace(/"/g, '""')}"`).join('\n');
    const blob = new Blob([`Question,Answer\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportKnown = () => {
      const knownCards = flashcards.filter((_, i) => cardStatus[i] === 'known');
      downloadCards(knownCards, 'known_flashcards');
  };
  
  const handleExportUnknown = () => {
      const unknownCards = flashcards.filter((_, i) => cardStatus[i] === 'unknown');
      downloadCards(unknownCards, 'unknown_flashcards');
  };

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

  const handleTextInputMode = () => {
    setTextInputMode(true);
    setInputText(exampleText);
    setExtractedText("");
    setFlashcards([]);
  };

  const handleGenerateFromText = async () => {
    if (!inputText.trim()) return;
    
    setGeneratingCards(true);
    setExtractedText(inputText);
    
    try {
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setFlashcards(data.flashcards);
      } else {
        // Fallback to simple generation if API fails
        generateFlashcards(inputText);
      }
    } catch (error) {
      console.error('Error generating flashcards:', error);
      // Fallback to simple generation
      generateFlashcards(inputText);
    } finally {
      setGeneratingCards(false);
    }
  };

  const handleClearText = () => {
    setInputText("");
    setExtractedText("");
    setFlashcards([]);
  };

  const handleBackToUpload = () => {
    setTextInputMode(false);
    setInputText("");
    setExtractedText("");
    setFlashcards([]);
  };

  return (
    <div className="blocky-card text-black">
      <div className="flex flex-col items-center">
        <div className="w-full mb-6">
          <button
            onClick={handleTextInputMode}
            className="blocky-button w-full bg-purple-600 hover:bg-purple-700 text-white mb-4"
          >
            ENTER TEXT MANUALLY (WITH EXAMPLE)
          </button>
        </div>
        {textInputMode && (
          <div className="blocky-content w-full mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">TEXT INPUT MODE</h3>
              <button
                onClick={handleBackToUpload}
                className="blocky-button bg-gray-500 text-white"
              >
                ← BACK TO PDF UPLOAD
              </button>
            </div>
            
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
          </div>
        )}

        {flashcards.length > 0 && !reviewMode && (
          <div className="blocky-content w-full mt-8">
            <h3 className="text-lg font-bold mb-4">FLASHCARDS ({flashcards.length})</h3>
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={startReview}
                className="blocky-button w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
              >
                START REVIEW
              </button>
              <button
                onClick={handleAdd}
                className="blocky-button w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              >
                ADD NEW CARD
              </button>
              <button
                onClick={handleDownloadCSV}
                className="blocky-button bg-gray-500 hover:bg-gray-600 text-white"
              >
                DOWNLOAD CSV
              </button>
              <button
                onClick={handleDownloadJSON}
                className="blocky-button bg-gray-500 hover:bg-gray-600 text-white"
              >
                DOWNLOAD JSON
              </button>
            </div>
            <div className="space-y-4">
              {flashcards.map((card, index) => (
                <div key={index} className="blocky-card bg-gray-50 p-4">
                  {editingIndex === index ? (
                    <div className="space-y-2">
                      <textarea
                        value={editQuestion}
                        onChange={(e) => setEditQuestion(e.target.value)}
                        className="blocky-input w-full"
                        placeholder="Question"
                      />
                      <textarea
                        value={editAnswer}
                        onChange={(e) => setEditAnswer(e.target.value)}
                        className="blocky-input w-full"
                        placeholder="Answer"
                      />
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => handleSave(index)} className="blocky-button bg-green-500 text-white">Save</button>
                        <button onClick={() => setEditingIndex(null)} className="blocky-button bg-gray-400 text-white">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">Q: {card.question}</p>
                      <p className="text-gray-700">A: {card.answer}</p>
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => handleEdit(index)} className="blocky-button bg-yellow-500">Edit</button>
                        <button onClick={() => handleDelete(index)} className="blocky-button bg-red-500 text-white">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {reviewMode && (
          <div className="blocky-content w-full mt-8">
              {reviewSummary ? (
                  <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4">REVIEW COMPLETE!</h3>
                      <p className="mb-2">You spent {formatTime(elapsedTime)} on this session.</p>
                      <p className="mb-2">Known cards: {cardStatus.filter(s => s === 'known').length}</p>
                      <p className="mb-4">Unknown cards: {cardStatus.filter(s => s === 'unknown').length}</p>
                      <div className="flex justify-center space-x-4 flex-wrap gap-2">
                           <button onClick={() => setReviewMode(false)} className="blocky-button bg-blue-600 hover:bg-blue-700 text-white">
                              BACK TO DECK
                          </button>
                          <button onClick={startReview} className="blocky-button bg-green-600 hover:bg-green-700 text-white">
                              RESTART REVIEW
                          </button>
                           <button onClick={handleExportKnown} className="blocky-button bg-purple-600 hover:bg-purple-700 text-white">
                              EXPORT KNOWN
                          </button>
                          <button onClick={handleExportUnknown} className="blocky-button bg-red-600 hover:bg-red-700 text-white">
                              EXPORT UNKNOWN
                          </button>
                      </div>
                  </div>
              ) : (
               <div className="w-full">
                  <div className="flex justify-between items-center mb-4">
                      <div className="text-sm font-bold">
                          TIMER: {formatTime(elapsedTime)}
                      </div>
                      <div className="text-sm font-bold">
                          CARD {currentCard + 1} / {flashcards.length}
                      </div>
                  </div>

                  <Progress value={((currentCard + 1) / flashcards.length) * 100} className="w-full mb-4" />
                  
                  <div className="blocky-card bg-gray-50 min-h-[200px] flex items-center justify-center p-6 mb-4">
                      <p className="text-xl text-center font-bold">
                      {showAnswer ? flashcards[currentCard].answer : flashcards[currentCard].question}
                      </p>
                  </div>

                  <div className="flex justify-center items-center flex-wrap gap-4">
                      <button onClick={handlePrevCard} disabled={currentCard === 0} className="blocky-button bg-gray-400 text-white disabled:bg-gray-300 disabled:text-gray-500">PREVIOUS</button>
                      <button onClick={() => setShowAnswer(!showAnswer)} className="blocky-button bg-blue-600 text-white w-40">
                          {showAnswer ? 'SHOW QUESTION' : 'SHOW ANSWER'}
                      </button>
                      <button onClick={handleNextCard} className="blocky-button bg-gray-400 text-white">
                          {currentCard === flashcards.length - 1 ? 'FINISH' : 'NEXT'}
                      </button>
                  </div>
                   <div className="mt-6 border-t-2 border-dashed border-gray-300 pt-6">
                      <h4 className="text-center font-bold mb-4">HOW WELL DO YOU KNOW THIS?</h4>
                      <div className="flex justify-center items-center flex-wrap gap-4">
                          <button onClick={() => handleMarkCard('unknown')} className="blocky-button bg-red-500 text-white w-48">DON'T KNOW (U)</button>
                          <button onClick={handleNextCard} className="blocky-button bg-yellow-500 w-48">SKIP</button>
                          <button onClick={() => handleMarkCard('known')} className="blocky-button bg-green-500 text-white w-48">KNOW (K)</button>
                      </div>
                  </div>
                  <div className="mt-6 text-center text-sm text-gray-500">
                      Keyboard shortcuts: [←] Previous, [→] Next, [SPACE] Flip, [K] Know, [U] Don't Know
                  </div>
              </div>
              )}
          </div>
        )}
      </div>
    </div>
  )
}
