import { useState, useEffect } from 'react';
import { motion} from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface TallyWindow extends Window {
    Tally?: {
        loadEmbeds: () => void;
    };
}

const AIRegistrationPage = () => {
  const TARGET_DATE = new Date('2026-01-18T00:00:00+05:45').getTime();

  const [isExpired, setIsExpired] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const distance = TARGET_DATE - now;

      if (distance <= 0) {
        setIsExpired(true);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [TARGET_DATE]);

  const units: Array<[string, number]> = [
    ['days', countdown.days],
    ['hours', countdown.hours],
    ['minutes', countdown.minutes],
    ['seconds', countdown.seconds],
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-12 sm:pb-20 dark:bg-slate-950 bg-slate-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto text-center space-y-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-cyan-500/20 mb-6 sm:mb-8 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-medium shadow-lg"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            AI Image Prompting Competition
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent px-2">
            {!isExpired ? 'Competition Starts Officially' : 'The Arena is Open'}
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            {!isExpired 
              ? 'Prepare yourself. The AI Image Prompting challenge begins soon.' 
              : 'Register now for the AI Image Prompting Competition 2026.'}
          </p>

          {/* Rulebook Link */}
          <div className="mb-8">
            <a
              href="https://drive.google.com/file/d/164Vw1m9AI3lj2XOj_J8pANZoPWcLBadM/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              See the Rulebook
            </a>
          </div>

          {/* Countdown */}
          {!isExpired && (
            <div className="flex justify-center mb-10 sm:mb-14 px-2">
              <div
                className="flex space-x-8"
                role="group"
                aria-label="Countdown timer"
                aria-live="polite"
              >
                {units.map(([key, value]) => (
                  <div key={key} className="flex flex-col items-center">
                    <motion.div
                      key={`${key}-${value}`}
                      initial={{ y: -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 6, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-extrabold leading-none text-6xl sm:text-7xl md:text-8xl text-cyan-600 dark:text-cyan-300"
                    >
                      {value < 10 ? `0${value}` : value}
                    </motion.div>
                    <div className="mt-2 text-lg uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {key}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer / Timer Info */}
          {!isExpired && (
            <div className="flex flex-col items-center gap-3 px-4">
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base text-center">
                Starts on <span className="font-semibold text-cyan-600 dark:text-cyan-400">18 Jan 2026 — Sunday · 00:00 NPT</span>
              </p>
              <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-cyan-500 to-transparent rounded-full" />
            </div>
          )}

          {/* Tally Form - Always visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
              <div className="max-w-2xl mx-auto">
                <iframe
                  data-tally-src="https://tally.so/embed/VLPMjg?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                  loading="lazy"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="AI Prompting"
                  className="tally-embed rounded-xl"
                  style={{ minHeight: '600px' }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIRegistrationPage;