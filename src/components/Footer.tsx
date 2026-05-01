import { motion } from "framer-motion";
import { Mail, Globe, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-3">
            Let's Connect
          </h2>
          <p className="text-text-secondary max-w-md mx-auto mb-8">
            Interested in working together or want to learn more about any of
            these projects? Reach out.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <a
              href="#"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-surface-2 text-text-secondary hover:text-text hover:border-border-light transition-all hover:-translate-y-0.5"
            >
              <Code size={16} />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-surface-2 text-text-secondary hover:text-text hover:border-border-light transition-all hover:-translate-y-0.5"
            >
              <Globe size={16} />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-surface-2 text-text-secondary hover:text-text hover:border-border-light transition-all hover:-translate-y-0.5"
            >
              <Mail size={16} />
              <span className="text-sm font-medium">Email</span>
            </a>
          </div>
        </motion.div>

        <div className="text-center text-xs text-text-muted pt-8 border-t border-border">
          Built with React, Tailwind CSS & Framer Motion
        </div>
      </div>
    </footer>
  );
}
