import Button from "@/components/button/button";

export const metadata = {
  title: "About | Portfolio",
  description: "Learn more about my software engineering experience",
};

export default function AboutPage() {
  const experiences = [
    {
      id: 1,
      title: "Frontend Software Engineer",
      period: "First Role",
      description: "Built modern web applications with a strong focus on frontend development",
      technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "JavaScript"],
      highlights: [
        "Developed responsive web applications",
        "Optimized performance and UX",
        "Collaborated with design and backend teams",
        "Implemented modern best practices"
      ]
    },
    {
      id: 2,
      title: "Backend Software Engineer", 
      period: "Latest Role",
      description: "Specialized in backend development including payment gateway integration and microservices",
      technologies: ["Payment Gateway APIs", "Docker", "NATS", "Node.js", "Microservices", "PostgreSQL"],
      highlights: [
        "Designed and implemented payment systems",
        "Built scalable microservices architecture",
        "Containerized applications with Docker",
        "Implemented message queue systems with NATS",
        "Developed robust APIs"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="space-y-8">
          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight">
              About Me
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-light">
              Software Engineer passionate about building scalable and high-performance applications
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 py-12">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Who I Am
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  I'm a software engineer with experience in both frontend and backend development. 
                  I started my career focusing on frontend technologies and have evolved to work on 
                  complex backend systems. I'm passionate about writing clean, maintainable code and 
                  building solutions that solve real problems.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  What I Do
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  I specialize in full-stack development with expertise in modern web technologies. 
                  From crafting beautiful user interfaces to building robust backend systems, I ensure 
                  every project is optimized for performance, scalability, and maintainability.
                </p>
              </div>
            </div>

            {/* Right Column - Skills */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  Technical Stack
                </h2>
                <div className="space-y-4">
                  {/* Frontend */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Frontend
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Next.js, React.js, TypeScript, JavaScript, Tailwind CSS
                    </p>
                  </div>

                  {/* Backend */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Backend & Infrastructure
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Node.js, Payment Gateways, Docker, NATS, PostgreSQL, Microservices
                    </p>
                  </div>

                  {/* Tools & DevOps */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Tools & Practices
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Git, Docker, VS Code, REST APIs, System Design, Clean Code
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-8 py-12 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Professional Experience
            </h2>
            
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {exp.period}
                    </p>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {exp.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Technologies:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Key Achievements:
                    </p>
                    <ul className="space-y-1">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Let's Work Together
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              I'm always interested in hearing about challenging projects and opportunities to contribute 
              to impactful solutions. Feel free to reach out if you'd like to collaborate!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">Get In Touch</Button>
              <Button variant="outline" size="lg">
                Read My Blog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Background Elements */}
      <div className="fixed top-20 -right-40 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 -left-40 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
