import ProjectCard from "./ProjectCard";
const projects = [
  {
    title: "SCRIB",
    image:
      "https://res.cloudinary.com/dlqecula3/image/upload/v1762530830/Screenshot_150_laijzl.png",
    description:
      "A real-time collaborative platform for creating, editing, and organizing documentation and notes across teams.",
    fullDescription: `
      A real-time collaborative platform for creating, editing, and organizing 
      documentation and notes. Multiple users can work together simultaneously and share 
      updates instantly. The system ensures smooth synchronization, structured 
      organization, and an intuitive writing experience designed for both individuals and teams.
      `,
    stack: ["Next.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL"],
    codeUrl: "https://github.com/absterr/scrib",
    previewUrl: "https://scrib-puce.vercel.app",
    videoDemo:
      "https://res.cloudinary.com/dlqecula3/video/upload/v1762532125/Scrib_demo_g7hctj.mp4",
  },
  {
    title: "NODE-AUTH",
    image: "",
    description:
      "A secure, session aware authentication system for typescript applications.",
    fullDescription: `
      A robust typescript authentication service featuring secure user login, session 
      tracking, and token-based access control. Users can sign in, maintain active 
      sessions, and refresh access seamlessly. The system ensures reliable security, 
      smooth authentication flow, and efficient session management across all user interactions.
      There's also a react app that demonstrate how developers can best implement 
      NodeAuth with their client application. <a href="https://github.com/absterr/AuthClient"
      target="_blank" rel="noopener noreferrer"
      style="color:#22c55e; text-decoration:underline;">
      Click here for more.
      </a> 
      `,
    stack: ["Node.js", "Typescript", "Express", "PostgreSQL"],
    codeUrl: "https://github.com/absterr/NodeAuth",
    previewUrl: null,
    videoDemo: null,
  },
];

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
        A collection of my projects showcasing different aspects of modern
        software development, from user interfaces to backend architecture.
      </p>

      <div className="py-6 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
