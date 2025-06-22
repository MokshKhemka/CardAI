"use client";

import { FileUpload } from "@/components/file-upload"
import './demo.css'
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-notebook-paper text-gray-900">
      {/* Navigation */}
      <nav className="blocky-section border-4 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="blocky-card p-2">
                <h1 className="text-2xl font-bold text-black">CardAI</h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="blocky-button px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">Features</a>
              <a href="#how-it-works" className="blocky-button px-4 py-2 bg-green-600 text-white hover:bg-green-700">How It Works</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="blocky-section border-4 border-black bg-white my-8">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="blocky-card p-8 mb-8">
              <h1 className="text-5xl font-bold text-black mb-6">Transform Your PDFs Into Flashcards</h1>
              <p className="text-xl text-gray-700 mb-8">Upload any PDF and extract text to create interactive flashcards. Perfect for students and anyone who wants to study more effectively.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#upload" className="blocky-button px-8 py-4 bg-red-600 text-white text-lg hover:bg-red-700">
                  Start Creating
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main File Upload Section */}
      <section id="upload" className="blocky-section border-4 border-black bg-white my-8">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-gray-700">Upload your first PDF and see the magic happen!</p>
            </div>
            <FileUpload />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="blocky-section border-4 border-black bg-white my-8">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">What You Can Do</h2>
            <p className="text-xl text-gray-700">Simple tools for effective learning</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="blocky-card p-6">
              <div className="text-4xl mb-4">PDF</div>
              <h3 className="text-xl font-bold text-black mb-2">PDF Upload</h3>
              <p className="text-gray-700">Upload any PDF file and extract text content automatically.</p>
            </div>
            <div className="blocky-card p-6">
              <div className="text-4xl mb-4">Type</div>
              <h3 className="text-xl font-bold text-black mb-2">Manual Text Input</h3>
              <p className="text-gray-700">Enter text manually if you prefer to type or paste content.</p>
            </div>
            <div className="blocky-card p-6">
              <div className="text-4xl mb-4">Cards</div>
              <h3 className="text-xl font-bold text-black mb-2">Create Flashcards</h3>
              <p className="text-gray-700">Generate flashcards from your content with question and answer pairs.</p>
            </div>
            <div className="blocky-card p-6">
              <div className="text-4xl mb-4">Study</div>
              <h3 className="text-xl font-bold text-black mb-2">Study Mode</h3>
              <p className="text-gray-700">Review your flashcards with a built-in study interface.</p>
            </div>
            <div className="blocky-card p-6">
              <div className="text-4xl mb-4">Save</div>
              <h3 className="text-xl font-bold text-black mb-2">Save Progress</h3>
              <p className="text-gray-700">Your flashcards are saved locally in your browser.</p>
            </div>
            <div className="blocky-card p-6">
              <div className="text-4xl mb-4">Export</div>
              <h3 className="text-xl font-bold text-black mb-2">Export Data</h3>
              <p className="text-gray-700">Download your flashcards as CSV or JSON files.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="blocky-section border-4 border-black bg-white my-8">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-xl text-gray-700">Three simple steps to create your flashcards</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="blocky-card p-6 text-center">
              <div className="text-6xl mb-4">1</div>
              <h3 className="text-xl font-bold text-black mb-2">Upload PDF</h3>
              <p className="text-gray-700">Simply drag and drop your PDF file or click to browse.</p>
            </div>
            <div className="blocky-card p-6 text-center">
              <div className="text-6xl mb-4">2</div>
              <h3 className="text-xl font-bold text-black mb-2">Extract Text</h3>
              <p className="text-gray-700">The app extracts text content from your PDF automatically.</p>
            </div>
            <div className="blocky-card p-6 text-center">
              <div className="text-6xl mb-4">3</div>
              <h3 className="text-xl font-bold text-black mb-2">Create & Study</h3>
              <p className="text-gray-700">Generate flashcards and start studying with the built-in review mode.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="blocky-section border-4 border-black bg-white my-8">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700">Everything you need to know about CardAI ;)</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="blocky-card p-6">
              <h3 className="text-xl font-bold text-black mb-2">What file formats do you support?</h3>
              <p className="text-gray-700">Currently, we support PDF files. You can also enter text manually if you have content in other formats. Pretty straightforward, right? :)</p>
            </div>
            <div className="blocky-card p-6">
              <h3 className="text-xl font-bold text-black mb-2">How do the flashcards work?</h3>
              <p className="text-gray-700">The app extracts text from your PDF and helps you create question-answer pairs. You can edit, add, or delete flashcards as needed. It's like having a personal study assistant!</p>
            </div>
            <div className="blocky-card p-6">
              <h3 className="text-xl font-bold text-black mb-2">Can I share flashcards with others?</h3>
              <p className="text-gray-700">Absolutely! You can export your flashcards as CSV or JSON files and share them with classmates or colleagues. Teamwork makes the dream work ;)</p>
            </div>
            <div className="blocky-card p-6">
              <h3 className="text-xl font-bold text-black mb-2">Is my data secure?</h3>
              <p className="text-gray-700">Your data is processed locally in your browser. We don't store your PDF content or flashcards on our servers. Your privacy is our priority!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="blocky-section border-4 border-black bg-white my-8">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="blocky-card p-8">
              <h2 className="text-4xl font-bold text-black mb-4">Ready to Start Learning?</h2>
              <p className="text-xl text-gray-700 mb-8">Upload your first PDF and create your own flashcards today.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#upload" className="blocky-button px-8 py-4 bg-red-600 text-white text-lg hover:bg-red-700">
                  Get Started Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
