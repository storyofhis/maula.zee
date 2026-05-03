import Button from "@/components/button/button";

export const metadata = {
  title: "About | Portfolio",
  description: "Learn more about my software engineering experience",
};

export default function AboutPage() {
  const educations = [
    {
      id: 1,
      institution: "Institut Teknologi Sepuluh Nopember (ITS)",
      degree: "Bachelor of Computer Science",
      period: "2020 - 2024",
      description: "Focused on software engineering, algorithms, and system design. Graduated with honors and completed a thesis on scalable web applications."
    },
    {
      id: 2,
      institution: "Apple Developer Academy @ BINUS, Tangerang",
      degree: "Apple Certified Product Engineer (iOS Development)",
      period: "March 2026 - Now",
      description: "Intensive program focused on iOS development, covering Swift programming, UI/UX design, and app deployment. Currently working on a capstone project to develop a social networking app for local communities."
    }
  ];
  const experiences = [
    {
      id: 1,
      title: "Frontend Software Engineer",
      company : "Dinas Pendidikan Kota Surabaya (PPDB Surabaya)",
      period: "January 2022 - July 2023",
      description: "Built modern web applications with a strong focus on frontend development",
      technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "JavaScript"],
      highlights: [
        "Developed responsive web applications",
        "Optimized performance and UX",
        "Collaborated with design and backend teams",
        "Implemented modern best practices",
        "Understanding UI development. Manage some Design System, Developing large Software System",
        "Solve some bugs in Frontend with ReactJS Typescript, Redux, Integrated with backend using Laravel."
      ]
    },
    {
      id: 2,
      title: "Backend Software Engineer Intern", 
      period: "November 2022 - December 2022",
      company: "Lingotalk",
      description: "Focused on backend development and system design for high-performance applications",
      technologies: ["Docker", "Node.js", "Microservices", "FaunaDB"],
      highlights: [
        "Designed and implemented backend systems",
        "Built scalable microservices architecture",
        "Containerized applications with Docker",
        "Collaborated with cross-functional teams",
        "Diagnosed and resolved bugs, enhancing system functionality and ensuring optimal performance to optimize code efficiency",
        "Create some service API to make Gamification apps, deployment etc. Using NodeJS with Typescript and Fauna DB (NoSQL) in Database System."
      ]
    },
    {
      id: 3,
      title: "Software Engineer", 
      period: "October 2024 - February 2026",
      company: "Bayarind Artha Internusa (Bayarind)",
      description: "Specialized in backend development including payment gateway integration and microservices",
      technologies: ["Go (Programming Language)", "PostgreSQL", "NoSQL", "Payment Gateways", "NATS", "Docker"],
      highlights: [
        "Designed and implemented payment systems",
        "Optimized database performance with PostgreSQL",
        "Implemented message queue systems with NATS",
        "Applied system design principles for scalability",
        "Develop Payment Gateway integrated with Faspay (payment gateway provider) in Microservice based and using SNAP (National Standard Open API Payments) for API standardization in Indonesia",
        "Create Messaging Listener System to track the payment success and failed using NATS and connected with Elastic Search to log every transaction",
        "Maintaining authentication service to encrypt every transaction and develop gRPC communication to send encrypted message and receive decrypted data in payment services.",
        "revamped payment single integration code from PHP Native to Go (Programming Language)",
        "develop payment linkage service to integrate client’s wallet apps"
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
              Being a Product Engineer passionate about building scalable and high-performance applications
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
                  I'm a product engineer with experience in both frontend and backend development. 
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
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                      @ {exp.company}
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
          
          <div className="space-y-8 py-12 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Education
            </h2>
            
            <div className="space-y-6">
              {educations.map((edu) => (
                <div key={edu.id} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                      @ {edu.institution}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {edu.period}
                    </p>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400">
                    {edu.description}
                  </p>
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
