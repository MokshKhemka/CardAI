import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFlashcards(response.data.flashcards);
    } catch (err) {
      setError('Error uploading file. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8">PDF to Flashcards</h1>
                
                <div className="mb-8">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>

                <button
                  onClick={handleUpload}
                  disabled={loading || !file}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium
                    ${loading || !file ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {loading ? 'Processing...' : 'Convert to Flashcards'}
                </button>

                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                {flashcards.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Generated Flashcards</h2>
                    <div className="space-y-4">
                      {flashcards.map((card, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-sm">
                          <p className="font-medium">Front: {card.front}</p>
                          <p className="mt-2 text-gray-600">Back: {card.back}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 