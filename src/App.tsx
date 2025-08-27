// src/App.tsx
import { useState, useEffect } from 'react'; // <-- 1. Add useState
import { getSessionId, setSessionId } from './services/sessionManager'; // <-- 2. Import session helpers
import apiClient from './services/apiClient'; // <-- 3. Import apiClient
import { AnalysisForm } from './features/analysis/AnalysisForm';
import { ResultsDisplay } from './features/analysis/ResultsDisplay';
// 1. Import the new HistoryList component
import { HistoryList } from './features/history/HistoryList';
import { Footer } from './components/common/Footer'; // <-- 1. Import the new component
import { Spinner } from './components/common/Spinner'; // <-- 2. Import Spinner

function App() {
  const [isSessionReady, setIsSessionReady] = useState(false); // <-- 3. Add loading state

  // --- 4. ADD THE SESSION INITIALIZATION LOGIC ---
  useEffect(() => {
    const initializeSession = async () => {
      const existingSessionId = getSessionId();
      if (!existingSessionId) {
        try {
          // If no session exists, request a new one from the backend
          const response = await apiClient.get<{ session_id: string }>(
            '/session/new'
          );
          const newSessionId = response.data.session_id;
          // And save it to localStorage for future use
          setSessionId(newSessionId);
        } catch (error) {
          console.error('Failed to initialize session:', error);
          // Optional: handle this error, maybe show a message to the user
        }
      }
      // 4. Once we have a session (or failed), mark it as ready
      setIsSessionReady(true);
    };

    initializeSession();
  }, []); // The empty dependency array ensures this runs only once on mount

  // 5. Conditionally render based on session status
  if (!isSessionReady) {
    return (
      <div className="bg-gray-900 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4 sm:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400">
          AI Sentiment Analyzer
        </h1>
        <p className="text-gray-400 mt-2">
          Analyze text for sentiment, emotions, and keywords using IBM Watson.
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <AnalysisForm />
        <div className="mt-8">
          <ResultsDisplay />
        </div>
        <HistoryList />
      </main>

      {/* 2. Add the Footer component at the end of the main layout */}
      <Footer />
    </div>
  );
}

export default App;
