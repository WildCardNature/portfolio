import { motion } from "framer-motion";
import { categories, type Category } from "../data/projects";

interface Props {
  active: Category | "all";
  onChange: (cat: Category | "all") => void;
}

export default function FilterNav({ active, onChange }: Props) {
  return (
    <nav
      id="projects"
      className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border py-4"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => onChange(cat.key)}
              className="relative px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors"
              style={{
                color: active === cat.key ? "#e4e4ed" : "#8888a0",
              }}
            >
              {active === cat.key && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-surface-3 border border-border-light rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
