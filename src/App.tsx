import './index.css'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background glow effects */}
      <div className="bg-glow -top-[10%] -left-[10%]"></div>
      <div className="bg-glow -bottom-[10%] -right-[10%] opacity-20" style={{ background: 'radial-gradient(circle, #ff4d94 0%, transparent 70%)' }}></div>

      {/* Navigation */}
      <nav className="glass sticky top-4 z-50 flex items-center justify-between mx-4 md:mx-8 px-6 py-4 mt-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-black text-xl">K</div>
          <h2 className="text-2xl font-heading mb-0">Compass</h2>
        </div>
        <div className="hidden md:flex gap-8 text-zinc-400 font-medium">
          <a href="#" className="hover:text-white transition-colors">Solutions</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Resources</a>
        </div>
        <button className="btn-primary">Get Started</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="animate-float mb-8">
          <span className="glass px-4 py-2 rounded-full text-sm text-primary border-primary/20">
            ✨ Introducing Kyureeus Compass v1.0
          </span>
        </div>
        
        <h1 className="text-5xl md:text-8xl leading-[1.1] mb-6 max-w-5xl mx-auto tracking-tight">
          Navigate your <span className="text-gradient">digital ventures</span> with precision
        </h1>
        
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
          Cloud-native infrastructure management, real-time analytics, and seamless deployment tools for modern engineering teams.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="btn-primary px-10 py-4 text-lg">Start Free Trial</button>
          <button className="btn-secondary px-10 py-4 text-lg">View Demo</button>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-32 relative">
          <div className="glass w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/50 aspect-video md:aspect-[21/9]">
            {/* Header bar */}
            <div className="h-10 bg-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            
            {/* Content area */}
            <div className="p-8 text-left grid md:grid-cols-3 gap-8">
              <div className="glass p-6 md:h-80">
                <div className="w-full h-5 bg-white/5 rounded mb-4"></div>
                <div className="w-4/5 h-5 bg-white/5 rounded mb-4"></div>
                <div className="w-3/5 h-5 bg-white/5 rounded mb-8"></div>
                <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-xl"></div>
              </div>
              <div className="glass bg-black/40 p-6 md:col-span-2 md:h-80 font-mono text-sm">
                 <pre className="text-primary italic overflow-x-auto">
                   <code>
                     {`// Navigating to the future\nconst compass = new Compass({\n  vision: "precise",\n  speed: "maximum"\n});\n\ncompass.launch();\n\n> System initialized...\n> Ready for deployment.`}
                   </code>
                 </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-32 py-16 border-t border-white/10 text-center text-zinc-500">
        <p>© 2026 Kyureeus Compass. Built for the next generation of engineers.</p>
      </footer>
    </div>
  )
}

export default App
