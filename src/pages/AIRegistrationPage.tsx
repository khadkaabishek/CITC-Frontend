import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Countdown from "../components/Countdown";

interface TallyWindow extends Window {
  Tally?: {
    loadEmbeds: () => void;
  };
}

const AIRegistrationPage = () => {
  const TARGET_DATE = new Date("2026-01-18T00:00:00+05:45").getTime();

  const [isExpired, setIsExpired] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [prevCountdown, setPrevCountdown] = useState(countdown);

  // Load Tally embed
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => {
      if (typeof window !== "undefined" && (window as TallyWindow).Tally) {
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

  // Countdown logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const distance = TARGET_DATE - now;

      if (distance <= 0) {
        setIsExpired(true);
        return;
      }

      const newCountdown = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      };

      setPrevCountdown(countdown);
      setCountdown(newCountdown);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [countdown, TARGET_DATE]);

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
            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-cyan-500/20 mb-6 sm:mb-8 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-medium shadow-lg"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            AI Image Prompting Competition
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent px-2">
            {!isExpired ? "Competition Starts Officially" : "The Arena is Open"}
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            {!isExpired
              ? 'Prepare yourself. The AI Image Prompting challenge begins soon.'
              : 'Register now for the AI Image Prompting Competition 2026.'}
          </p>

          {/* Rulebook */}
          <div>
            <a
              href="https://drive.google.com/file/d/1huoBP5mijSC2-fGAy8J9cUhPGf_wu64S/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition"
            >
              See the Rulebook
            </a>
          </div>

          {/* Countdown */}
          {!isExpired && (
            <>
              <Countdown
                countdown={countdown}
                prevCountdown={prevCountdown}
              />

              <div className="flex flex-col items-center gap-3 px-4">
                <p className="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base text-center">
                  Starts on{" "}
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                    18 Jan 2026 — Sunday · 00:00 NPT
                  </span>
                </p>
                <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-cyan-500 to-transparent rounded-full" />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AIRegistrationPage;
