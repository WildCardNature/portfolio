import { motion } from "framer-motion";
import { skills } from "../data/projects";

export default function SkillsMatrix() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">
          Technical Skills
        </h2>
        <p className="text-text-secondary mb-10">
          The tools and technologies behind the work
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: gi * 0.06 }}
            className="rounded-xl border border-border bg-surface/60 p-5"
          >
            <h3 className="text-xs font-mono uppercase tracking-wider text-accent mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-[12px] font-mono px-2 py-1 rounded-md bg-surface-2 text-text-secondary border border-border hover:border-border-light hover:text-text transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
