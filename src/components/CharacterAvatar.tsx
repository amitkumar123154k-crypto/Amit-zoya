import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface CharacterAvatarProps {
  state: "idle" | "listening" | "processing" | "speaking";
}

export default function CharacterAvatar({ state }: CharacterAvatarProps) {
  // Determine theme colors and glowing values for each state
  const getTheme = () => {
    switch (state) {
      case "listening":
        return {
          glow: "shadow-[0_0_60px_rgba(245,158,11,0.5)] border-amber-500/40",
          ringColor: "border-amber-500/30",
          coreBg: "bg-gradient-to-tr from-amber-600/30 to-yellow-400/40",
          accentColor: "bg-amber-500",
          textColor: "text-amber-400",
        };
      case "processing":
        return {
          glow: "shadow-[0_0_60px_rgba(6,182,212,0.5)] border-cyan-500/40",
          ringColor: "border-cyan-500/30",
          coreBg: "bg-gradient-to-tr from-cyan-600/30 to-blue-500/40",
          accentColor: "bg-cyan-500",
          textColor: "text-cyan-400",
        };
      case "speaking":
        return {
          glow: "shadow-[0_0_80px_rgba(236,72,153,0.6)] border-pink-500/50",
          ringColor: "border-pink-500/40",
          coreBg: "bg-gradient-to-tr from-pink-600/40 to-violet-500/50",
          accentColor: "bg-pink-500",
          textColor: "text-pink-400",
        };
      case "idle":
      default:
        return {
          glow: "shadow-[0_0_50px_rgba(139,92,246,0.4)] border-violet-500/30",
          ringColor: "border-violet-500/20",
          coreBg: "bg-gradient-to-tr from-violet-600/20 to-fuchsia-500/30",
          accentColor: "bg-violet-500",
          textColor: "text-violet-400",
        };
    }
  };

  const theme = getTheme();

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center select-none">
      {/* Outer Glow Grid */}
      <div className="absolute inset-0 rounded-full border border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03)_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      {/* Hologram Scanner Scanning effect */}
      <motion.div
        animate={{
          y: ["-120%", "120%", "-120%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent pointer-events-none z-10"
      />

      {/* Ambient glowing aura underneath */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute w-72 h-72 rounded-full filter blur-3xl ${theme.accentColor} opacity-20 pointer-events-none`}
      />

      {/* Spinning notched tech outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: state === "processing" ? 5 : 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-dashed ${theme.ringColor} p-1`}
      >
        <div className="w-full h-full rounded-full border border-white/5 relative">
          <span className={`absolute -top-1 left-1/2 -ml-1 w-2 h-2 rounded-full ${theme.accentColor} shadow-[0_0_10px_currentColor]`} />
          <span className={`absolute -bottom-1 left-1/2 -ml-1 w-2 h-2 rounded-full ${theme.accentColor} shadow-[0_0_10px_currentColor]`} />
        </div>
      </motion.div>

      {/* Opposite spinning mid tech ring with nodes */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: state === "listening" ? 6 : state === "processing" ? 3 : 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute w-52 h-52 md:w-68 md:h-68 rounded-full border border-double ${theme.ringColor}`}
      >
        <div className="w-full h-full rounded-full border border-white/5 relative">
          <span className={`absolute top-1/2 -left-1 -mt-1 w-1.5 h-1.5 rounded-full ${theme.accentColor} opacity-60`} />
          <span className={`absolute top-1/2 -right-1 -mt-1 w-1.5 h-1.5 rounded-full ${theme.accentColor} opacity-60`} />
        </div>
      </motion.div>

      {/* Central Interactive Quantum Core */}
      <motion.div
        animate={
          state === "listening"
            ? { scale: [1, 1.12, 0.95, 1.05, 1] }
            : state === "speaking"
            ? { scale: [1, 1.05, 0.98, 1.07, 1] }
            : { scale: [1, 1.03, 1] }
        }
        transition={{
          duration: state === "speaking" ? 0.4 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`relative z-10 w-36 h-36 md:w-48 md:h-48 rounded-full flex items-center justify-center border-2 ${theme.glow} transition-all duration-500 overflow-hidden ${theme.coreBg} backdrop-blur-md`}
      >
        {/* Animated cybernetic structural matrix */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#000,#000_2px,transparent_2px,transparent_8px)]" />
        </div>

        {state === "speaking" ? (
          // Radiant glowing equalizer peaks for voice speech
          <div className="flex gap-1.5 items-end justify-center h-16 w-32 px-4 z-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [8, Math.random() * 45 + 16, 8],
                }}
                transition={{
                  duration: 0.18 + i * 0.04,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`w-1.5 rounded-full ${theme.accentColor} shadow-[0_0_12px_currentColor]`}
              />
            ))}
          </div>
        ) : state === "listening" ? (
          // Concentric radar/sonic waves expanding outwards
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              animate={{ scale: [0.6, 1.7], opacity: [0.8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              className={`absolute w-24 h-24 rounded-full border-2 ${theme.accentColor} opacity-70`}
            />
            <motion.div
              animate={{ scale: [0.6, 1.7], opacity: [0.8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 0.45 }}
              className={`absolute w-24 h-24 rounded-full border-2 ${theme.accentColor} opacity-70`}
            />
            <div className={`w-8 h-8 rounded-full ${theme.accentColor} shadow-[0_0_20px_currentColor] z-10`} />
          </div>
        ) : state === "processing" ? (
          // High throughput tech sync ring
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className={`w-14 h-14 rounded-full border-2 border-dashed border-t-transparent ${theme.accentColor}`}
            />
            <div className="absolute font-mono text-[9px] text-cyan-400 font-bold tracking-widest uppercase">
              THK_G
            </div>
          </div>
        ) : (
          // IDLE state: A calm breathing celestial star inside a dark matter field
          <motion.div
            animate={{
              scale: [0.93, 1.07, 0.93],
              boxShadow: [
                "0 0 15px rgba(139, 92, 246, 0.4)",
                "0 0 35px rgba(217, 70, 239, 0.6)",
                "0 0 15px rgba(139, 92, 246, 0.4)",
              ],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center relative"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#fff]" />
          </motion.div>
        )}
      </motion.div>

      {/* Cybernetic telemetry display tags */}
      <div className="absolute inset-0 pointer-events-none font-mono text-[9px] text-white/20">
        <span className="absolute top-2 left-6">ZYA-SYS9</span>
        <span className={`absolute top-2 right-6 uppercase ${theme.textColor}`}>AI:{state}</span>
        <span className="absolute bottom-2 left-6">V_RPL_4.0</span>
        <span className="absolute bottom-2 right-6">AMIT_Z1</span>
      </div>
    </div>
  );
}
