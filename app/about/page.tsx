import React from "react";
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Mail, Download } from "lucide-react";
import AboutHero from "@/components/about/about-hero";
import AboutExperience from "@/components/about/about-experience";

export default function AboutPage() {
  const educations = [
    {
      institution: "Institut Teknologi Sepuluh Nopember (ITS)",
      degree: "Bachelor of Computer Science",
      period: "2020 - 2024",
      description: "Focused on software engineering, algorithms, and system design. Graduated with honors and completed a thesis on scalable web applications."
    },
    {
      institution: "Apple Developer Academy @ BINUS, Tangerang",
      degree: "Apple Certified Product Engineer (iOS Development)",
      period: "March 2026 - Now",
      description: "Intensive program focused on iOS development, covering Swift programming, UI/UX design, and app deployment. Currently working on a capstone project to develop a social networking app for local communities."
    }
  ];

  const experiences = [
    {
      title: "Software Engineer",
      company: "Bayarind Artha Internusa (Bayarind)",
      period: "October 2024 - February 2026",
      desc: "Specialized in backend development including payment gateway integration and microservices. Developed SNAP-standard payment services using Go, NATS, and PostgreSQL.",
      technologies: ["Go (Programming Language)", "NATS", "PostgreSQL", "Microservices", "Redis", "Messaging", "Scheduler", "gRPC", "ElasticSearch", "Payment Gateway"],
      highlights: [
        "Optimized database performance with PostgreSQL",
        "Implemented message queue systems with NATS",
        "Applied system design principles for scalability",
        "Develop Payment Gateway integrated with Faspay (payment gateway provider) in Microservice based and using SNAP (National Standard Open API Payments) for API standardization in Indonesia",
        "Create Messaging Listener System to track the payment success and failed using NATS and connected with Elastic Search to log every transaction",
        "Maintaining authentication service to encrypt every transaction and develop gRPC communication to send encrypted message and receive decrypted data in payment services.",
        "revamped payment single integration code from PHP Native to Go (Programming Language)",
        "develop payment linkage service to integrate client’s wallet apps"
      ]
    },
    {
      title: "Frontend Software Engineer",
      company: "Dinas Pendidikan Kota Surabaya",
      period: "January 2022 - July 2023",
      desc: "Built modern web applications with a focus on performance using ReactJs, Next.js, TypeScript, and Redux.",
      technologies: ["ReactJs", "Next.js", "TypeScript", "Redux"],
      highlights: [
        "Developed responsive web applications",
        "Optimized performance and UX",
        "Collaborated with design and backend teams",
        "Implemented modern best practices",
        "Understanding UI development. Manage some Design System, Developing large Software System",
        "Solve some bugs in Frontend with ReactJS Typescript, Redux, Integrated with backend API."
      ]
    },
    {
      title: "Backend Engineer Intern",
      company: "Lingotalk",
      period: "October 2022 - December 2022",
      desc: "Focused on backend development and system design for high-performance applications using Node.js and FaunaDB.",
      technologies: ["Node.js", "TypeScript", "FaunaDB", "Microservices"],
      highlights: [
        "Designed and implemented backend systems",
        "Built scalable microservices architecture",
        "Containerized applications with Docker",
        "Collaborated with cross-functional teams",
        "Diagnosed and resolved bugs, enhancing system functionality and ensuring optimal performance to optimize code efficiency",
        "Create some service API to make Gamification apps, deployment etc. Using NodeJS with Typescript and Fauna DB (NoSQL) in Database System."

      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-zinc-100 dark:selection:bg-zinc-800">
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-40">
        <AboutHero />

        {/* Biography Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">BIOGRAPHY</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-8 text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
              <p>
                I'm a software engineer with a deep-rooted passion for building scalable, high-performance systems.
                My journey began with a fascination for crafting seamless user interfaces, which eventually led me
                into the world of robust backend architectures and payment systems.
              </p>
              <p>
                I believe that software is more than just code—it's a medium for solving real-world problems
                with elegance and precision. Whether it's optimizing a database query or refining a micro-interaction,
                I strive for excellence in every detail.
              </p>
            </div>
          </div>
        </section>

        <AboutExperience experiences={experiences} educations={educations} />

        {/* Stack & CTA Section */}
        <section className="border-t border-zinc-100 dark:border-zinc-900 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">CONTACT</h2>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tight leading-none">
                LET'S BUILD <br />
                <span className="text-zinc-400">THE FUTURE</span>.
              </h2>

              <div className="flex flex-wrap gap-4 mb-24">
                <a
                  href="mailto:contact@zee.dev"
                  className="group flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
                >
                  <Mail size={20} /> Get in Touch
                </a>
                <button
                  className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full font-bold transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <Download size={20} /> Download CV
                </button>
              </div>

              <div className="flex gap-12">
                <Link href="/" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 font-bold transition-colors">HOME</Link>
                <Link href="/blog" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 font-bold transition-colors">WRITING</Link>
                <a href="#" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 font-bold transition-colors">X / TWITTER</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
