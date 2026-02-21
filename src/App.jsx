import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'

// Build timestamp
const BUILD_TIME = new Date().toLocaleString('en-US', {
  timeZone: 'America/New_York',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
});

function App() {
  const [productionProjects, setProductionProjects] = useState([])
  const [experimentalProjects, setExperimentalProjects] = useState([])
  const [roadmap, setRoadmap] = useState([])
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => {
        setProductionProjects(data.production || [])
        setExperimentalProjects(data.experimental || [])
        setRoadmap(data.roadmap || [])
      })
      .catch(err => console.error('Error loading projects:', err))
  }, [])


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <Analytics />
      {/* Subtle grid background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #22c55e 1px, transparent 1px),
                           linear-gradient(to bottom, #22c55e 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-mono font-bold text-green-400">
              ~/neil
            </div>
            <div className="hidden md:flex gap-8">
              {['Home', 'Projects', 'Roadmap', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const sectionId = item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase();
                    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(item.toLowerCase());
                  }}
                  className="text-sm font-mono text-gray-400 hover:text-green-400 transition-colors"
                >
                  {item.toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 pt-16">
        {/* Hero Section */}
        <section id="hero" className="py-12 pb-8 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Text */}
              <div className="space-y-6">
                <p className="font-mono text-green-400 text-sm">$ whoami</p>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
                  Neil Patel
                </h1>
                <p className="text-xl font-mono">
                  <span className="text-cyan-400">Marketing Scientist</span>
                  <span className="text-gray-500"> / </span>
                  <span className="text-purple-400">Agentic Engineer</span>
                </p>
                <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
                  I build agentic systems and data-driven marketing solutions.
                  Passionate about leveraging AI to create impactful applications.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection('projects');
                    }}
                    className="px-6 py-3 bg-green-500 rounded-lg text-black font-mono font-medium hover:bg-green-400 transition-all duration-200"
                  >
                    view_projects()
                  </button>
                  <a
                    href="https://github.com/neilkpatel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-3 border border-gray-700 rounded-lg text-gray-300 font-mono hover:border-green-500 hover:text-green-400 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/neilkiranpatel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-3 border border-gray-700 rounded-lg text-gray-300 font-mono hover:border-green-500 hover:text-green-400 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    linkedin
                  </a>
                </div>
              </div>

              {/* Right Column - Headshot */}
              <div className="relative lg:mt-8 flex justify-center">
                <div className="relative group">
                  {/* Gradient glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-green-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
                  <img
                    src="/neil_headshot.jpeg"
                    alt="Neil Patel"
                    className="relative w-72 h-72 lg:w-80 lg:h-80 object-cover rounded-xl border border-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="pt-8 pb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Stats Bar */}
            <div className="mb-12 grid grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { value: '10', label: 'Projects Built' },
                { value: '4', label: 'In Production' },
                { value: '100+', label: 'Active Users' },
                { value: '3', label: 'Databases Designed' },
                { value: '44+', label: 'Tests Written' },
                { value: '6', label: 'APIs Integrated' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#111] border border-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 font-mono">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-mono mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Production Projects */}
            <div className="mb-12">
              <p className="font-mono text-green-400 text-sm mb-2">$ ls ./production</p>
              <h2 className="text-3xl font-bold text-white">Live Projects <span className="text-gray-500">— used by 100+ users</span></h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
              {productionProjects.map((project, index) => (
                <div
                  key={index}
                  className={`group relative bg-[#111] rounded-lg overflow-hidden transition-all duration-300 ${
                    project.featured
                      ? 'border-2 border-yellow-500/60 hover:border-yellow-400 shadow-lg shadow-yellow-500/10'
                      : 'border border-gray-800 hover:border-green-500/50'
                  }`}
                >
                  {/* Featured glow */}
                  {project.featured && (
                    <div className="absolute -inset-px bg-gradient-to-r from-yellow-500/20 via-amber-500/10 to-yellow-500/20 rounded-lg pointer-events-none"></div>
                  )}
                  {/* Terminal Header */}
                  <div className="relative bg-[#1a1a1a] border-b border-gray-800 px-4 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="ml-2 text-xs font-mono text-gray-500">{project.demo.replace('https://', '')}</span>
                    {project.featured ? (
                      <span className="ml-auto px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-mono rounded border border-yellow-500/30">NEW</span>
                    ) : (
                      <span className="ml-auto px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-mono rounded">LIVE</span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="relative p-5">
                    {/* Project Name */}
                    <h3 className={`text-xl font-bold mb-1 transition-colors ${
                      project.featured
                        ? 'text-yellow-400 group-hover:text-yellow-300'
                        : 'text-white group-hover:text-green-400'
                    }`}>
                      {project.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                    {/* Screenshot */}
                    {project.images && project.images.length > 0 && (
                      <div className="mb-4">
                        <a href={project.images[0].src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded border border-gray-700 hover:border-green-500/50 transition-colors">
                          <img src={project.images[0].src} alt={project.images[0].caption} title={project.images[0].caption} className="w-full aspect-video object-contain bg-black/50 cursor-pointer" />
                        </a>
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs font-mono rounded border border-green-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="border-t border-gray-800 pt-3 mb-1 space-y-1.5">
                        {project.highlights.map((h, i) => (
                          <div key={i} className="text-cyan-400/80 text-xs flex items-start gap-2 font-mono">
                            <span className="text-green-500 mt-px shrink-0">▸</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="px-5 pb-4 flex gap-3">
                    <button
                      onClick={() => window.open(project.demo, '_blank')}
                      className="flex-1 text-center px-4 py-2 bg-green-500 text-black rounded font-mono text-sm font-medium hover:bg-green-400 transition-colors cursor-pointer"
                    >
                      visit_site()
                    </button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-700 text-gray-400 rounded font-mono text-sm hover:border-green-500 hover:text-green-400 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      repo
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Experimental Projects */}
            <div className="mb-12">
              <p className="font-mono text-green-400 text-sm mb-2">$ ls ./experiments</p>
              <h2 className="text-3xl font-bold text-white">Experimental Projects <span className="text-gray-500">— technical explorations</span></h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {experimentalProjects.map((project, index) => (
                <div
                  key={index}
                  className="group relative bg-[#111] rounded-lg border border-gray-800 overflow-hidden hover:border-green-500/50 transition-all duration-300"
                >
                  {/* Terminal Header */}
                  <div className="bg-[#1a1a1a] border-b border-gray-800 px-4 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="ml-2 text-xs font-mono text-gray-500">{project.demo ? project.demo.replace('https://', '') : 'local://research'}</span>
                    <span className="ml-auto px-2 py-0.5 bg-gray-700/50 text-gray-400 text-xs font-mono rounded">{project.date}</span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                    {/* Image Gallery */}
                    {project.images && project.images.length > 0 && (
                      <div className="mb-4">
                        {project.images.length === 1 ? (
                          <a href={project.images[0].src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded border border-gray-700 hover:border-green-500/50 transition-colors">
                            <img src={project.images[0].src} alt={project.images[0].caption} title={project.images[0].caption} className="w-full aspect-video object-contain bg-black/50 cursor-pointer" />
                          </a>
                        ) : (
                          <div className="grid grid-cols-2 gap-1.5">
                            {project.images.map((img, i) => (
                              <a key={i} href={img.src} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded border border-gray-700 hover:border-green-500/50 transition-colors">
                                <img src={img.src} alt={img.caption} title={img.caption} className="w-full aspect-video object-contain bg-black/50 cursor-pointer" />
                              </a>
                            ))}
                          </div>
                        )}
                        <p className="text-gray-500 text-xs font-mono mt-1.5">click to expand</p>
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs font-mono rounded border border-green-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="border-t border-gray-800 pt-3 mb-1 space-y-1.5">
                        {project.highlights.map((h, i) => (
                          <div key={i} className="text-cyan-400/80 text-xs flex items-start gap-2 font-mono">
                            <span className="text-green-500 mt-px shrink-0">▸</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="px-5 pb-4 flex gap-3">
                    {project.demo && (
                      <button
                        onClick={() => window.open(project.demo, '_blank')}
                        className="flex-1 text-center px-4 py-2 bg-green-500 text-black rounded font-mono text-sm font-medium hover:bg-green-400 transition-colors cursor-pointer"
                      >
                        try_it()
                      </button>
                    )}
                    {project.report && (
                      <button
                        onClick={() => window.open(project.report, '_blank')}
                        className="flex-1 text-center px-4 py-2 bg-green-500 text-black rounded font-mono text-sm font-medium hover:bg-green-400 transition-colors cursor-pointer"
                      >
                        view_report()
                      </button>
                    )}
                    {project.images && !project.demo && !project.report && (
                      <button
                        onClick={() => window.open(project.images[0].src, '_blank')}
                        className="flex-1 text-center px-4 py-2 bg-green-500 text-black rounded font-mono text-sm font-medium hover:bg-green-400 transition-colors cursor-pointer"
                      >
                        view_results()
                      </button>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-gray-700 text-gray-400 rounded font-mono text-sm hover:border-green-500 hover:text-green-400 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        repo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-16 px-6 border-t border-gray-800">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="font-mono text-green-400 text-sm mb-2">$ cat ./roadmap.md</p>
              <h2 className="text-3xl font-bold text-white">Roadmap <span className="text-gray-500">— getting closer to the model</span></h2>
            </div>

            <div className="bg-[#111] rounded-lg border border-gray-800 overflow-hidden">
              <div className="bg-[#1a1a1a] border-b border-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-2 text-xs font-mono text-gray-500">~/neil/roadmap</span>
                <span className="ml-auto px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-mono rounded">{roadmap.filter(r => !r.done).length} queued</span>
              </div>
              <div className="p-5 space-y-4">
                {roadmap.map((item, index) => (
                  <div key={index} className={`flex items-start gap-3 ${item.done ? 'opacity-50' : ''}`}>
                    <span className={`mt-0.5 text-lg shrink-0 ${item.done ? 'text-green-500' : 'text-gray-600'}`}>
                      {item.done ? '[x]' : '[ ]'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-mono font-bold text-sm ${item.done ? 'line-through text-gray-500' : 'text-white'}`}>
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-purple-500/10 text-purple-400 text-xs font-mono rounded border border-purple-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 border-t border-gray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="font-mono text-green-400 text-sm mb-4">$ cat ./contact.txt</p>
            <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Find me on these platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/neilkpatel"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-700 rounded-lg text-gray-300 font-mono hover:border-green-500 hover:text-green-400 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/neilkiranpatel/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-700 rounded-lg text-gray-300 font-mono hover:border-green-500 hover:text-green-400 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-gray-800 bg-[#0a0a0a]">
          <div className="container mx-auto text-center">
            <div className="mb-4">
              <span className="font-mono text-green-400">~/neil</span>
            </div>
            <p className="text-gray-500 text-sm font-mono mb-2">
              Built with React + Vite + Tailwind
            </p>
            <p className="text-gray-600 text-xs font-mono mb-2">
              Last updated: {BUILD_TIME} EST
            </p>
            <p className="text-gray-600 text-xs font-mono">
              © {new Date().getFullYear()} Neil Patel
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
