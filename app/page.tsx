import Button from "@/components/button/button";
import Link from "next/link";

export default function Home() {
  const services = [
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces",
    },
    {
      icon: "⚡",
      title: "Web Development",
      description: "Fast, modern web applications built with latest technologies",
    },
    {
      icon: "🔧",
      title: "Full Stack Solutions",
      description: "Complete end-to-end development from frontend to backend",
    },
    {
      icon: "📈",
      title: "Performance Optimization",
      description: "Optimizing for speed, SEO, and user experience",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 sm:pt-32 pb-20 sm:pb-32">
        {/* Background Gradients */}
        <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-center">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="block text-slate-900 dark:text-white">
                  Build Digital
                </span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Experiences
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
                I design and develop modern web applications that users love. With
                expertise in React, Next.js, and modern design principles.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
              <Link href="/about">
                <Button size="lg">Learn About Me</Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  Read My Blog
                </Button>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-12 animate-bounce">
              <svg
                className="w-6 h-6 mx-auto text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 sm:py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              My Experience
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Full-stack software engineer with expertise in frontend and backend development
            </p>
          </div>

          <div className="space-y-6">
            {/* Frontend Experience */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:shadow-slate-900/10 dark:hover:shadow-white/5 transition-all duration-300">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Frontend Development
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  First professional experience
                </p>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Built modern, responsive web applications with a focus on performance and user experience.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "React.js", "TypeScript", "JavaScript", "Tailwind CSS"].map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Experience */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:shadow-slate-900/10 dark:hover:shadow-white/5 transition-all duration-300">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Backend & Infrastructure
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Current focus
                </p>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Specialized in building scalable backend systems including payment gateway integration, containerization with Docker, and microservices architecture using NATS.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Payment Gateways", "Docker", "NATS", "Node.js", "PostgreSQL", "Microservices"].map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <Link href="/about">
              <Button variant="outline">Learn More About My Experience</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What I Offer Section */}
      <section className="py-20 sm:py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              What I Offer
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Solutions built with modern technologies and best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:shadow-slate-900/10 dark:hover:shadow-white/5 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 sm:py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Latest Articles
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Read my thoughts on web development and technology
            </p>
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Let's Connect
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Interested in learning more about my experiences and work? Check out my blog and about page.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/about">
              <Button size="lg">About Me</Button>
            </Link>
            <Link href="/blog">
              <Button variant="secondary" size="lg">
                Read My Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600 dark:text-slate-400">
            <p>&copy; 2026 My Portfolio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
