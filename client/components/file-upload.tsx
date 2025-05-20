"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
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
    }
  }

  const handleUpload = () => {
    if (!file) return

    setUploading(true)

    // Simulate upload progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setUploading(false)
        // In a real app, this is where you'd call the API to process the PDF
      }
    }, 150)
  }

  const openFileSelector = () => {
    inputRef.current?.click()
  }

  return (
    <Card className="mb-10 bg-white border border-notebook-line shadow-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-serif font-semibold mb-6 text-pencil-lead flex items-center gap-2">
            <FileText className="h-5 w-5 text-pencil-lead" />
            <span>Upload Your PDF</span>
          </h2>

          <div
            className={cn(
              "relative border-2 border-dashed rounded-md p-10 w-full mb-6 text-center transition-all duration-300",
              dragActive
                ? "border-apple-red bg-apple-red/5"
                : "border-notebook-line hover:border-pencil-lead/50 bg-gray-50",
              file ? "border-chalkboard-green bg-chalkboard-green/5" : "",
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileSelector}
          >
            {file ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <div className="bg-chalkboard-green/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-chalkboard-green" />
                </div>
                <span className="text-pencil-lead">{file.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Upload className="h-8 w-8 text-pencil-lead" />
                </div>
                <p className="text-pencil-lead mb-2">Drag and drop your PDF here, or click to browse</p>
                <p className="text-xs text-pencil-lead/70">Supports PDF files up to 50MB</p>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              style={{ display: "block" }}
            />
          </div>

          {file && !uploading && (
            <Button
              onClick={handleUpload}
              className="w-full sm:w-auto bg-chalkboard-green hover:bg-chalkboard-green/90 text-white border-0"
            >
              Generate Flashcards
            </Button>
          )}

          {uploading && (
            <div className="w-full">
              <div className="relative h-2 mb-4 overflow-hidden rounded-full bg-gray-200">
                <Progress value={progress} className="h-full bg-chalkboard-green" />
              </div>
              <p className="text-sm text-center text-pencil-lead/70 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-pencil-yellow" />
                <span>AI is processing your PDF...</span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
