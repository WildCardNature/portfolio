import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
}));

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Particle field */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-accent/20"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          className="text-text-secondary text-sm tracking-[0.2em] uppercase mb-4 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Portfolio
        </motion.p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="text-text">Full-Stack</span>
          <br />
          <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
            & Mobile Engineer
          </span>
        </h1>

        <motion.p
          className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Building at the intersection of mobile, blockchain, AI, and systems
          engineering — from published dApps to GPU shaders to algorithmic
          trading bots.
        </motion.p>

        {/* Stats bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {[
            ["11", "Projects"],
            ["6+", "Languages"],
            ["Mobile + Web", "Platforms"],
            ["Blockchain + AI", "Domains"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <div className="text-lg md:text-xl font-semibold text-text font-mono">
                {value}
              </div>
              <div className="text-xs text-text-muted uppercase tracking-wider mt-1">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#projects"
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-text-muted hover:text-text-secondary transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase">See my work</span>
        <ChevronDown size={18} />
      </motion.a>
    </section>
  );
}
