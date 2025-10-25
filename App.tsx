import React, { useState, FormEvent } from 'react';

// Define types for form status
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// Base64 encoded WebP image for the background
const backgroundImage = `data:image/webp;base64,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`;

// Helper component for icons
const StatusIcon = ({ status }: { status: FormStatus }) => {
  if (status === 'success') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-green-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  if (status === 'error') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-red-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return null;
};

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    // --- REAL FORM SUBMISSION ---
    const FORM_ENDPOINT = 'https://formspree.io/f/xblpjrbb'; 
    
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });

      if (response.ok) {
        setStatus('success');
        setMessage("Thanks for your interest! We'll notify you at launch.");
        setEmail('');
      } else {
        throw new Error('Form submission failed');
      }

    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy link: ', err);
      alert('Failed to copy link.');
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-900 text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 animate-zoom-in"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      
      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 z-20">
        <header className="absolute top-0 left-0 p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter">
            SyncTeam<span className="text-blue-400">AI</span>
          </h1>
        </header>

        <main className="text-center animate-fade-in-up w-full">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Unleash the Power of Collective AI.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-300">
            Go beyond a single agent. SyncTeamAI orchestrates a symphony of specialized AIs to solve complex problems with unprecedented creativity and efficiency. Be the first to know when we launch.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 text-white bg-slate-800/50 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                disabled={status === 'loading'}
                aria-label="Email Address"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <span>Notify Me</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-4 text-xs text-slate-400 max-w-lg mx-auto">
            We’ll only email you when we launch. No spam. No sharing.
          </p>

          {message && (
            <div 
              className={`mt-4 text-sm flex items-center justify-center gap-2 transition-opacity duration-300 ${status === 'idle' ? 'opacity-0' : 'opacity-100'}`}
              role="alert"
            >
              <StatusIcon status={status} />
              <span>{message}</span>
            </div>
          )}
        </main>
        
        <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-slate-500 text-sm">
          <div className="flex justify-center items-center gap-6 mb-2">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X" className="text-slate-500 hover:text-slate-300 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Connect with us on LinkedIn" className="text-slate-500 hover:text-slate-300 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.98 0-1.62.67-1.62 1.93V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.38.93 3.38 4.45z" />
              </svg>
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy page link"
              className="text-slate-500 hover:text-slate-300 transition-all duration-300 flex items-center gap-2"
            >
              {isCopied ? (
                <>
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-400 text-xs">Copied!</span>
                </>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              )}
            </button>
          </div>
          <p>&copy; {new Date().getFullYear()} NeuroSyncTeam AI Dynamics Pty Ltd. All rights reserved.</p>
        </footer>
        
        <style>{`
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          @keyframes zoom-in {
            from {
              transform: scale(1);
            }
            to {
              transform: scale(1.05);
            }
          }
          .animate-zoom-in {
            animation: zoom-in 15s ease-in-out forwards alternate infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default App;
