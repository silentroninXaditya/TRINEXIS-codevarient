import React, { useState, useEffect } from 'react';
import {
  Key,
  Shield,
  Check,
  AlertCircle,
  X,
  Sparkles,
  Trash2,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ByokModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated?: () => void;
}

const STORAGE_KEY_GEMINI = 'trinexis_byok_gemini_key';
const STORAGE_KEY_DEMO_MODE = 'trinexis_byok_demo_mode';

export const ByokModal: React.FC<ByokModalProps> = ({
  isOpen,
  onClose,
  onKeyUpdated,
}) => {
  const { isDark } = useTheme();
  const [apiKey, setApiKey] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const storedKey = localStorage.getItem(STORAGE_KEY_GEMINI) || '';
      const storedDemo = localStorage.getItem(STORAGE_KEY_DEMO_MODE);
      setApiKey(storedKey);
      setIsDemoMode(storedDemo !== null ? storedDemo === 'true' : true);
      setTestStatus('idle');
      setTestMessage('');
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY_GEMINI, apiKey.trim());
    localStorage.setItem(STORAGE_KEY_DEMO_MODE, isDemoMode.toString());
    setSavedSuccess(true);
    if (onKeyUpdated) onKeyUpdated();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY_GEMINI);
    localStorage.setItem(STORAGE_KEY_DEMO_MODE, 'true');
    setApiKey('');
    setIsDemoMode(true);
    setTestStatus('idle');
    setTestMessage('API key purged from localStorage. Reverted to Demo Simulation mode.');
    if (onKeyUpdated) onKeyUpdated();
  };

  const handleTestKey = async () => {
    if (isDemoMode) {
      setTestStatus('success');
      setTestMessage('Built-in Demo Simulation is active. Ready for zero-config judge testing.');
      return;
    }

    if (!apiKey.trim()) {
      setTestStatus('error');
      setTestMessage('Please enter an API key to test or switch on Demo Simulation.');
      return;
    }

    setTestStatus('testing');
    setTestMessage('Connecting to Google Gemini API...');

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Respond with "VERIFIED"' }] }],
          }),
        }
      );

      if (res.ok) {
        setTestStatus('success');
        setTestMessage('Connection verified successfully! Ready for live streaming.');
      } else {
        const err = await res.json();
        setTestStatus('error');
        setTestMessage(`Validation failed: ${err.error?.message || res.statusText}`);
      }
    } catch (e: any) {
      setTestStatus('error');
      setTestMessage(`Network error during test: ${e.message}`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg p-6 sm:p-8 rounded-2xl border flex flex-col gap-5 transition-all shadow-[0_16px_50px_rgba(0,0,0,0.95)] ${
          isDark
            ? 'bg-[#060812] border-indigo-500/30 text-white'
            : 'bg-white border-2 border-black text-black'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                isDark ? 'bg-slate-900 border-indigo-500/40 text-blue-400' : 'bg-black text-white'
              }`}
            >
              <Key size={18} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold uppercase tracking-wider">
                BRING YOUR OWN KEY (BYOK)
              </h3>
              <p className="font-mono text-xs text-slate-400">
                CLIENT-SIDE AI INTELLIGENCE MANAGER
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Security / Privacy Explanation (Section 5.8) */}
        <div
          className={`p-4 rounded-xl border flex gap-3 items-start ${
            isDark ? 'bg-slate-900/80 border-indigo-500/25' : 'bg-slate-50 border-black/20'
          }`}
        >
          <Shield size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="font-serif text-xs leading-relaxed text-slate-300">
            <strong>100% Client-Side Privacy:</strong> Core discovery is 100% free and stateless. To unlock custom LLM autopsy prompts, enter an API key below. Stored strictly in your browser&apos;s <code>localStorage</code>—never transmitted to or logged on a Trinexis server.
          </p>
        </div>

        {/* Built-in Demo Simulation Toggle */}
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
            isDark ? 'bg-purple-950/20 border-purple-500/30' : 'bg-purple-50 border-purple-300'
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-purple-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-300">
                Use Built-in Demo Simulation
              </span>
            </div>
            <p className="font-serif text-xs text-slate-400 mt-0.5">
              Ideal for judges testing without personal API keys. Generates realistic typewriter autopsies.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsDemoMode(!isDemoMode)}
            className="text-purple-400 hover:text-purple-300 transition-colors flex-shrink-0"
          >
            {isDemoMode ? <ToggleRight size={32} className="text-purple-400" /> : <ToggleLeft size={32} className="text-slate-500" />}
          </button>
        </div>

        {/* Custom API Key Input */}
        {!isDemoMode && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 font-bold uppercase">
                GOOGLE GEMINI API KEY:
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Get Free Key</span>
                <ExternalLink size={11} />
              </a>
            </div>

            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className={`w-full p-3 rounded-lg font-mono text-xs outline-none border ${
                isDark
                  ? 'bg-slate-950 text-white border-indigo-500/40 focus:border-indigo-400'
                  : 'bg-white text-black border-black focus:border-[#FF5500]'
              }`}
            />
          </div>
        )}

        {/* Test Banner */}
        {testMessage && (
          <div
            className={`p-3 rounded-lg font-mono text-xs flex items-center gap-2 border ${
              testStatus === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : testStatus === 'error'
                ? 'bg-red-950/40 border-red-500/50 text-red-300'
                : 'bg-blue-950/40 border-blue-500/50 text-blue-300'
            }`}
          >
            {testStatus === 'success' && <Check size={14} />}
            {testStatus === 'error' && <AlertCircle size={14} />}
            <span>{testMessage}</span>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          {apiKey ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-red-400 hover:text-red-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Trash2 size={13} />
              <span>Purge Key</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestKey}
              disabled={testStatus === 'testing'}
              className="px-3.5 py-2 rounded-lg font-mono text-xs uppercase border border-slate-700 hover:border-slate-400 text-slate-300 hover:text-white transition-all"
            >
              Test Connection
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={`px-5 py-2 rounded-lg font-mono text-xs uppercase font-bold transition-all flex items-center gap-1.5 ${
                isDark
                  ? 'bg-white text-black hover:bg-slate-200'
                  : 'bg-black text-white hover:bg-slate-900'
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check size={14} />
                  <span>Applied!</span>
                </>
              ) : (
                <span>Save Settings</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
