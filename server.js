const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Express server setup
// Serves static files and handles API requests

// Middleware
app.use(cors());
app.use(express.json());

// Add a simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Configure multer for PDF upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// Routes
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Validate file size (e.g., max 5MB)
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size exceeds 5MB limit' });
    }

    const data = await pdfParse(req.file.buffer);
    const text = data.text;
    
    // Enhanced text processing for flashcard generation
    // Use regex to identify key points or questions

    // Improved flashcard generation logic
    const generateFlashcards = (text) => {
      const keyPoints = text.match(/\b(?:What|How|Why|When|Where|Who)\b[^.!?]*[.!?]/gi) || [];
      return keyPoints.map(point => ({
        front: point.trim(),
        back: 'Answer will be generated here' // Placeholder for now
      }));
    };

    // Use the improved flashcard generation logic
    const flashcards = generateFlashcards(text);

    res.json({ flashcards });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ error: 'Error processing PDF' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 