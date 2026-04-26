import Button from "@/components/button/button";
import Link from "next/link";

export default function Home() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern online store with real-time inventory management",
      tags: ["React", "Next.js", "TypeScript", "PostgreSQL"],
      image: "🛍️",
    },
    {
      id: 2,
      title: "SaaS Dashboard",
      description: "Analytics dashboard with real-time data visualization",
      tags: ["Next.js", "Tailwind CSS", "Chart.js", "Node.js"],
      image: "📊",
    },
    {
      id: 3,
      title: "Mobile App Design",
      description: "Beautiful iOS app interface with smooth animations",
      tags: ["Figma", "Framer Motion", "React Native", "UI/UX"],
      image: "📱",
    },
  ];

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
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">
                View My Work
              </Button>
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
              What I Offer
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Comprehensive solutions for your digital needs
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
              Featured Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Selected work that showcases my skills and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-white/5 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700"
              >
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects */}
          <div className="text-center pt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Let's create something amazing together. Get in touch and let's discuss your ideas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg">Contact Me</Button>
            <Button variant="secondary" size="lg">
              Schedule a Call
            </Button>
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
