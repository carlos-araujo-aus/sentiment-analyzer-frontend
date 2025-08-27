import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha'; // <-- 1. Import the component
import { Spinner } from '../../components/common/Spinner';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchAnalysis } from './analysisSlice';
import { fetchHistory } from '../history/historySlice';

export const AnalysisForm = () => {
  const [text, setText] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.analysis);
  const isLoading = status === 'loading';

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleAnalyze = async () => {
    if (!text.trim() || !captchaToken) {
      return;
    }

    const resultAction = await dispatch(fetchAnalysis({ text, captchaToken }));

    if (fetchAnalysis.fulfilled.match(resultAction)) {
      dispatch(fetchHistory());
      // 3. If the analysis was successful, reset the CAPTCHA
      recaptchaRef.current?.reset();
      // 4. Also, clear the token from our state
      setCaptchaToken(null);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <label
        htmlFor="analysis-textarea"
        className="block text-xl font-semibold mb-4"
      >
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

      <div className="my-4 flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
          onChange={handleCaptchaChange}
          theme="dark"
        />
      </div>

      <button
        onClick={handleAnalyze}
        className="mt-4 w-full h-12 flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
        disabled={isLoading || !captchaToken || !text.trim()}
      >
        {isLoading ? <Spinner /> : 'Analyze'}
      </button>
    </div>
  );
};
