// src/App.tsx
import { AnalysisForm } from './features/analysis/AnalysisForm';
import { ResultsDisplay } from './features/analysis/ResultsDisplay';
// 1. Import the new HistoryList component
import { HistoryList } from './features/history/HistoryList';

function App() {
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
      </main>

      {/* 2. Add the HistoryList component to the main layout */}
      <footer className="w-full mt-auto flex justify-center">
        <HistoryList />
      </footer>
    </div>
  );
}

export default App;
