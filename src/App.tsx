// src/App.tsx
import { AnalysisForm } from './features/analysis/AnalysisForm';
import { ResultsDisplay } from './features/analysis/ResultsDisplay'; // <-- Import

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400">
          AI Sentiment Analyzer
        </h1>
        <p className="text-gray-400 mt-2">
          Paste your text below to get an analysis of its sentiment, emotions,
          and keywords.
        </p>
      </header>
      <main className="w-full max-w-2xl">
        <AnalysisForm />
        <ResultsDisplay />
      </main>
    </div>
  );
}

export default App;
