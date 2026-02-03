import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import Countdown from '../components/Countdown';

interface TallyWindow extends Window {
  Tally?: {
    loadEmbeds: () => void;
  };
}

const AIRegistrationPage = () => {
  const TARGET_DATE = new Date('2026-01-29T10:00:00+05:45').getTime();
  const isExpired = Date.now() >= TARGET_DATE;

  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined' && (window as TallyWindow).Tally) {
        (window as TallyWindow).Tally?.loadEmbeds();
      }
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden py-12 sm:py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-10 dark:opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 dark:from-cyan-500/3 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border border-cyan-400/40 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl dark:hover:shadow-cyan-500/20 transition-all duration-200"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            AI Image Prompting Competition
          </motion.div>

          {/* Title & Description */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent px-2 drop-shadow-lg">
              {!isExpired ? 'Physical Round starts in' : 'The Arena is Open'}
            </h1>

            {/* <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              {!isExpired
                ? 'Prepare yourself. The AI Image Prompting challenge begins soon.'
                : 'Register now for the AI Image Prompting Competition 2026.'}
            </p> */}
          </div>

          {/* Rulebook Link */}
          {/* <div>
            <a
              href="https://drive.google.com/file/d/1huoBP5mijSC2-fGAy8J9cUhPGf_wu64S/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              See the Rulebook
            </a>
          </div> */}

          {/* New Countdown Component */}
          {!isExpired && (
            <div className="py-4">
              <Countdown
                targetDate={TARGET_DATE}
                description="Starts on 26 Jan 2026 — Thursday · 10:00 NPT"
              />
              <div className="flex flex-col items-center mt-8">
                {/* <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-cyan-500 to-transparent rounded-full" /> */}
              </div>
            </div>
          )}

          {/* Tally Form */}
          {isExpired && (

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto pt-8"
            >
              <div className="backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl dark:shadow-2xl dark:shadow-slate-900/50 overflow-hidden transition-all duration-300 hover:shadow-3xl dark:hover:shadow-slate-900/70">
                <div className="max-w-2xl mx-auto">
                  <iframe
                    data-tally-src="https://tally.so/embed/KYVEEg?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                    loading="lazy"
                    width="100%"
                    height="645"
                    title="AI Prompt Second Round"
                    className="dark:[color-scheme:dark] transition-colors duration-300"
                  />

                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AIRegistrationPage;

