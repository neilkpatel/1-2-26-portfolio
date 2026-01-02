import { useState, useEffect } from 'react'

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error loading projects:', err))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            Neil Patel
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Developer & Creator
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/neilkpatel"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-lg text-white hover:bg-white/20 transition-all"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@neilkpatel.com"
              className="px-6 py-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-all"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-purple-400 transition-all hover:transform hover:scale-105"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    {project.name}
                  </h3>
                  <span className="text-sm text-purple-300 bg-purple-900/50 px-2 py-1 rounded">
                    {project.date}
                  </span>
                </div>

                <p className="text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm font-medium"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm font-medium"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-purple-200">
          <p className="text-sm">
            Built with React + Vite + Tailwind CSS
          </p>
          <p className="text-xs mt-2 opacity-70">
            © {new Date().getFullYear()} Neil Patel. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
