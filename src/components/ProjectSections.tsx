import { motion } from "framer-motion";
import { sections, projects, type Category } from "../data/projects";
import ProjectCard from "./ProjectCard";

interface Props {
  filter: Category | "all";
}

export default function ProjectSections({ filter }: Props) {
  if (filter !== "all") {
    const filtered = projects.filter((p) =>
      p.categories.includes(filter)
    );

    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-text-muted py-20">
            No projects in this category.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-20">
      {sections.map((section) => {
        const sectionProjects = section.projectIds
          .map((id) => projects.find((p) => p.id === id)!)
          .filter(Boolean);

        return (
          <motion.section
            key={section.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight">
                {section.title}
              </h2>
              <p className="text-text-secondary mt-1">{section.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sectionProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
