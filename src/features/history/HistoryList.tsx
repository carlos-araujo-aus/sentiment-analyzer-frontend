// src/features/history/HistoryList.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory } from './historySlice';
import type { RootState, AppDispatch } from '../../store/store';

export const HistoryList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, status, error } = useSelector((state: RootState) => state.history);

  // Use the useEffect hook to fetch history when the component mounts
  useEffect(() => {
    // We only want to fetch if the status is 'idle' to prevent re-fetching on every re-render
    if (status === 'idle') {
      dispatch(fetchHistory());
    }
  }, [status, dispatch]);

  const formatLocalDate = (dateString: string) => {
    // Create a new Date object from the UTC string provided by the API
    const date = new Date(dateString);
    // Use toLocaleString() to format the date according to the user's
    // browser settings (language and timezone).
    return date.toLocaleString();
  };

  // Conditional rendering based on the request status
  let content;

  if (status === 'loading') {
    content = <p className="text-gray-400">Loading history...</p>;
  } else if (status === 'succeeded') {
    if (items.length > 0) {
      content = (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-md animate-fade-in">
              <p className="truncate text-gray-300 italic">"{item.text_snippet}"</p>
              <div className="flex justify-between items-center mt-2">
                <span
                  className={`text-sm font-bold ${
                    item.sentiment_label === 'positive'
                      ? 'text-green-400'
                      : item.sentiment_label === 'negative'
                      ? 'text-red-400'
                      : 'text-yellow-400'
                  }`}
                >
                  {item.sentiment_label.charAt(0).toUpperCase() + item.sentiment_label.slice(1)}
                </span>
                <span className="text-xs text-gray-500">
                  {formatLocalDate(item.created_at)}
                  {/* {new Date(item.created_at).toLocaleString()} */}
                </span>
              </div>
            </li>
          ))}
        </ul>
      );
    } else {
      content = <p className="text-gray-500">No analysis history found. Run your first analysis!</p>;
    }
  } else if (status === 'failed') {
    content = <p className="text-red-400">Error: {error}</p>;
  }

  return (
    <div className="mt-12 w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Recent Analyses</h2>
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
        {content}
      </div>
    </div>
  );
};