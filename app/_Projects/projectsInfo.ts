const projectsInfo = [
  {
    title: 'SCRIB',
    image:
      'https://res.cloudinary.com/dlqecula3/image/upload/v1762530830/Screenshot_150_laijzl.png',
    description:
      'A real-time collaborative platform for creating, editing, and organizing documentation and notes across teams.',
    fullDescription: `
      A real-time collaborative platform for creating, editing, and organizing
      documentation and notes. Multiple users can work together simultaneously and share
      updates instantly. The system ensures smooth synchronization, structured
      organization, and an intuitive writing experience designed for both individuals and teams.
      `,
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind',
      'Node.js',
      'PostgreSQL',
      'Drizzle',
    ],
    codeUrl: 'https://github.com/absterr/scrib',
    previewUrl: 'https://scrib-puce.vercel.app',
    videoDemo:
      'https://res.cloudinary.com/dlqecula3/video/upload/v1762532125/Scrib_demo_g7hctj.mp4',
  },
  {
    title: 'NODE-AUTH',
    image: '',
    description:
      'A secure, session aware authentication system for typescript applications.',
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
    stack: ['Node.js', 'Typescript', 'Express', 'PostgreSQL', 'Sequelize'],
    codeUrl: 'https://github.com/absterr/NodeAuth',
    previewUrl: null,
    videoDemo: null,
  },
  {
    title: 'ROUTANA',
    image:
      'https://res.cloudinary.com/dlqecula3/image/upload/v1765617642/Screenshot_193_sycbjf.png',
    description:
      'A personalized learning roadmap generator that helps users plan, track, and adapt their journey based on goals and skill level.',
    fullDescription: `
      A personalized learning roadmap generator designed to help users build clear,
      goal-driven learning paths. The platform analyzes user goals, current skill level,
      and time availability to generate structured roadmaps with milestones, resources,
      and progress tracking.
    `,
    stack: [
      'Node.js',
      'React',
      'Typescript',
      'Bun',
      'Express',
      'PostgreSQL',
      'Drizzle',
      'Tanstack React query',
      'Docker',
    ],
    codeUrl: 'https://github.com/absterr/Routana',
    previewUrl: 'https://routana.onrender.com',
    videoDemo:
      'https://res.cloudinary.com/dlqecula3/video/upload/v1765618696/Routana_demo_cq7nus.mp4',
  },
  {
    title: 'CONFIDO',
    image:
      'https://res.cloudinary.com/dlqecula3/image/upload/v1772568396/Screenshot_28_t1ad1b.png',
    description:
      'A role-based interview preparation platform with tailored questions and instant feedback.',
    fullDescription: `
          An interview preparation platform designed to help individuals get ready for interviews
          through focused, role-specific practice. Users receive carefully tailored questions
          based on their role and get instant feedback. Confido helps users identify knowledge gaps,
          refine their thinking, and build confidence through structured, practical interview simulations.
          `,
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Drizzle',
    ],
    codeUrl: 'https://github.com/chingu-voyages/V59-tier3-team-32',
    previewUrl: 'https://v59-tier3-team-32-web.vercel.app',
    videoDemo:
      'https://res.cloudinary.com/dlqecula3/video/upload/v1772569490/confido_demo_vddice.mp4',
  },
  {
    title: 'FAITH',
    image:
      'https://res.cloudinary.com/dlqecula3/image/upload/v1773724324/Screenshot_31_utebkj.png',
    description: `This is Faith's portfolio.`,
    fullDescription: `
          A responsive and visually polished portfolio built to highlight experiences,
          technical skills, work, and personal brand. It features smooth navigation,
          conponent animations, responsive layouts, and optimized performance
          for a seamless user experience across devices.
                `,
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer motion'],
    codeUrl: null,
    previewUrl: 'https://faith-senpai.vercel.app',
    videoDemo:
      'https://res.cloudinary.com/dlqecula3/video/upload/v1773724256/faith_portfolio_demo_w4qmbt.mp4',
  },
];

export default projectsInfo;
