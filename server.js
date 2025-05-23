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

    const data = await pdfParse(req.file.buffer);
    const text = data.text;
    
    // Simple text splitting into flashcards (this is a basic implementation)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const flashcards = sentences.map(sentence => ({
      front: sentence.trim(),
      back: 'Answer will be generated here' // This is a placeholder
    }));

    res.json({ flashcards });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ error: 'Error processing PDF' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 