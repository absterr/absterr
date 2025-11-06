import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    title: "SPA-BOOKING.WEB",
    image: "/spa-booking-interior-dark.jpg",
    description:
      "A web application that streamlines spa appointment scheduling for both customers and spa administrators.",
    fullDescription: `
        A comprehensive spa booking system featuring real-time appointment scheduling, 
        customer management, and admin dashboard. Customers can browse available services, 
        view spa professional profiles, and book appointments. Administrators can manage 
        bookings, staff schedules, and service offerings. The system includes 
        email notifications and automated reminders.
      `,
    stack: ["React", "Node.js", "MongoDB", "Express"],
    codeUrl: "https://github.com",
    demoUrl: null,
    videoDemo: null,
  },
  {
    id: 2,
    title: "BLOG.WEB",
    image: "/news-entertainment-digital-tech.jpg",
    description:
      "Blog website where users can read blogs. The blogs are gotten from gnews api",
    fullDescription: `
        A modern blog platform that aggregates news articles from the GNews API. 
        Features include real-time article updates, category filtering, search functionality, 
        and responsive design. Users can browse the latest news across multiple categories, 
        read full articles, and access external links. The application caches articles for optimal performance.
      `,
    stack: ["Next.js", "TypeScript", "Tailwind", "Open API"],
    codeUrl: "https://github.com",
    demoUrl: "https://blog-demo.com",
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "E-COMMERCE.WEB",
    image: "/stickers-ecommerce-purple-grid.jpg",
    description:
      "An e-commerce platform for selling custom stickers with chosen design tools.",
    fullDescription: `
        A full-featured e-commerce platform specializing in custom stickers. Users can 
        upload their designs or use the built-in design tools to create unique stickers. 
        The platform integrates Stripe for secure payments, includes a shopping cart system, 
        order tracking, and customer accounts. Features inventory management and order 
        fulfillment workflows for administrators.
        `,
    stack: ["React", "Stripe", "PostgreSQL", "Express"],
    codeUrl: "https://github.com",
    demoUrl: null,
    videoDemo: null,
  },
  {
    id: 4,
    title: "CAFE.WEB",
    image: "/coffee-cafe-warm-brown.jpg",
    description:
      "A cafe website showcasing menu items and ambiance with online ordering capabilities.",
    fullDescription: `
        A complete cafe management website with menu showcase, online ordering system, 
        and table reservation. Features include a digital menu with item descriptions and 
        images, customer reviews, loyalty program integration, and real-time order status 
        tracking. The backend manages inventory, staff schedules, and customer preferences 
        for personalized recommendations.
        `,
    stack: ["Next.js", "React", "Tailwind", "Supabase"],
    codeUrl: "https://github.com",
    demoUrl: "https://cafe-demo.com",
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
