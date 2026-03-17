import ProjectCard from './ProjectCard';
import projectsInfo from './projectsInfo';

const Projects = () => {
  return (
    <section
      className="font-mono max-w-7xl mx-auto text-center py-32 lg:py-46 px-4 md:px-8"
      id="projects"
    >
      <h2 className="text-3xl md:text-5xl font-bold tracking-wide mb-3">
        PROJECTS
      </h2>
      <div className="w-16 md:w-24 h-1 bg-green-500 mx-auto mb-6 md:mb-8"></div>
      <p className="text-foreground/60 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto px-2">
        Proof of work, for those in doubt or denial.
      </p>

      <div className="py-6 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {projectsInfo.map((project, idx) => {
            const isLast = idx === projectsInfo.length - 1;
            const isOdd = projectsInfo.length % 2 !== 0;
            return (
              <div
                key={project.title}
                className={
                  isLast && isOdd
                    ? 'w-full md:col-span-2 flex justify-center'
                    : ''
                }
              >
                <div className={isLast && isOdd ? 'md:w-1/2 h-full' : 'h-full'}>
                  <ProjectCard project={project} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
