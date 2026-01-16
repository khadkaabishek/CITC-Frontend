import { motion } from "framer-motion";

interface CountdownProps {
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  prevCountdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const splitDigits = (num: number) =>
  num.toString().padStart(2, "0").split("");

const Countdown = ({ countdown, prevCountdown }: CountdownProps) => {
  const units = Object.entries(countdown);

  return (
    <div className="flex justify-center mb-8 sm:mb-12 md:mb-16 px-2">
      <div
        className="flex gap-4 sm:gap-6 md:gap-8"
        role="group"
        aria-label="Countdown timer"
      >
        {units.map(([key, value]) => {
          const prevValue =
            prevCountdown[key as keyof typeof prevCountdown];

          const currDigits = splitDigits(value);
          const prevDigits = splitDigits(prevValue);

          return (
            <div key={key} className="flex flex-col items-center">
              {/* Digits */}
              <div className="flex gap-1 sm:gap-1.5 md:gap-2">
                {currDigits.map((digit, index) => {
                  const digitChanged = digit !== prevDigits[index];

                  return (
                    <div
                      key={`${key}-${index}`}
                      className="
                        flex items-center justify-center
                        rounded-xl shadow-md
                        bg-white/90 dark:bg-slate-900/80
                        w-9 h-12
                        sm:w-12 sm:h-16
                        md:w-14 md:h-20
                        lg:w-16 lg:h-24
                      "
                    >
                      <motion.span
                        aria-live="polite"
                        initial={
                          digitChanged
                            ? { y: -16, opacity: 0 }
                            : false
                        }
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="
                          font-mono font-extrabold
                          text-3xl
                          sm:text-4xl
                          md:text-5xl
                          lg:text-6xl
                          bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400
                          bg-clip-text text-transparent
                        "
                      >
                        {digit}
                      </motion.span>
                    </div>
                  );
                })}
              </div>

              {/* Label */}
              <div
                className="
                  mt-2
                  text-[10px]
                  sm:text-xs
                  md:text-sm
                  lg:text-base
                  font-semibold uppercase tracking-wider
                  text-slate-500 dark:text-slate-400
                "
              >
                {key}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Countdown;
