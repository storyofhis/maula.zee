import Button from "@/components/button/button";

export const metadata = {
  title: "About | Portfolio",
  description: "Learn more about me and my work",
};

export default function AboutPage() {
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
              I craft modern digital experiences with clean code and thoughtful design.
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
                  I'm a passionate developer and designer focused on creating beautiful,
                  functional web experiences. With expertise in modern technologies like
                  React, Next.js, and Tailwind CSS, I build products that users love.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  What I Do
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  I specialize in full-stack development with a focus on user experience
                  design. From concept to deployment, I ensure every project is optimized
                  for performance, accessibility, and aesthetic excellence.
                </p>
              </div>
            </div>

            {/* Right Column - Skills */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  Skills & Technologies
                </h2>
                <div className="space-y-4">
                  {/* Frontend */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Frontend
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      React, Next.js, TypeScript, Tailwind CSS, Framer Motion
                    </p>
                  </div>

                  {/* Backend */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Backend
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Node.js, Express, PostgreSQL, MongoDB, APIs
                    </p>
                  </div>

                  {/* Tools */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Tools & Design
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Git, Figma, VS Code, DevTools, Performance Optimization
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 py-12 border-y border-slate-200 dark:border-slate-800">
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
                50+
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
                100%
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
                5+
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Years Experience</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6 pt-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Let's Work Together
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              I'm always interested in hearing about new projects and opportunities.
              Feel free to reach out if you'd like to collaborate!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">Get In Touch</Button>
              <Button variant="outline" size="lg">
                View Projects
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
