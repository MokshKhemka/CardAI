import React, { useState, useRef } from "react";

function Popup() {
  const [file, setFile] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("pdf", file);
    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setFlashcards(data.flashcards || []);
    setUploading(false);
  };

  return (
    <div style={{ width: 350, padding: 16, fontFamily: 'sans-serif' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>CardAI Extension</h2>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ marginBottom: 12 }}
      />
      <button onClick={handleUpload} disabled={uploading || !file} style={{ marginBottom: 16 }}>
        {uploading ? 'Processing...' : 'Generate Flashcards'}
      </button>
      {flashcards.length > 0 && (
        <div>
          <h3 style={{ fontWeight: 'bold', fontSize: 16 }}>Flashcards:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {flashcards.map((fc, i) => (
              <li key={i} style={{ background: '#f3f3f3', borderRadius: 8, padding: 10, marginBottom: 8 }}>
                <strong>Q:</strong> {fc.question}<br />
                <strong>A:</strong> {fc.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Popup; 