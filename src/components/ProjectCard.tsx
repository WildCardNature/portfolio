import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { Project } from "../data/projects";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => setExpanded(!expanded)}
      className="group relative cursor-pointer rounded-2xl border border-border bg-surface/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: expanded
          ? `0 0 40px ${project.accent}15, 0 8px 32px rgba(0,0,0,0.4)`
          : "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      {/* Accent top bar */}
      <div
        className="h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }}
      />

      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-semibold text-text truncate">
                {project.name}
              </h3>
              <span
                className="shrink-0 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border"
                style={{
                  color: project.statusColor,
                  borderColor: `${project.statusColor}40`,
                  backgroundColor: `${project.statusColor}10`,
                }}
              >
                {project.status}
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {project.tagline}
            </p>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 mt-1 text-text-muted"
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>

        {/* Tech icons row */}
        <div className="flex flex-wrap gap-1.5 mb-1">
          {project.techIcons.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface-2 text-text-muted border border-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-border">
                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                    Key Features
                  </h4>
                  <ul className="space-y-1.5">
                    {project.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span
                          className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: project.accent }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.stack.map((group) => (
                    <div
                      key={group.label}
                      className="rounded-lg bg-surface-2 border border-border p-3"
                    >
                      <h5 className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-2">
                        {group.label}
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-surface-3 text-text-secondary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Categories */}
                <div className="flex items-center gap-2 mt-4">
                  {project.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        color: project.accent,
                        backgroundColor: `${project.accent}12`,
                        border: `1px solid ${project.accent}30`,
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                  <div className="flex-1" />
                  <ExternalLink size={14} className="text-text-muted" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
