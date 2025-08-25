import { useState } from 'react';
import { Spinner } from '../../components/common/Spinner';

export const AnalysisForm = () => {
    const [text, setText] = useState('');
    const isLoading = false; // We will connect this to Redux later

    return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <label htmlFor="analysis-textarea" className="block text-xl font-semibold mb-4">
        Enter text to analyze
        </label>
        <textarea
        id="analysis-textarea"
        className="w-full h-40 p-3 bg-gray-700 text-gray-200 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:opacity-50"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
        />
        <button
        className="mt-4 w-full h-12 flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
        disabled={isLoading}
        >
        {isLoading ? <Spinner /> : 'Analyze'}
        </button>
    </div>
    );
};