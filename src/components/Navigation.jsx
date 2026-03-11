import { useState } from 'react'

export default function Navigation({ isDark, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Sertifikasi', href: '/#certifications' },
    { label: 'Project', href: '/#projects' },
    { label: 'Kontak', href: '/#contact' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-1 text-2xl font-black text-slate-950 dark:text-white">
          <span className="text-accent-cyan">&lt;</span>
          parothegreat
          <span className="text-accent-cyan">/&gt;</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate-950 dark:text-white hover:text-accent-cyan transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleDarkMode}
            className="text-2xl hover:scale-110 transition-transform"
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="text-2xl"
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 p-2"
          >
            <span className={`h-0.5 w-6 bg-slate-950 dark:bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-6 bg-slate-950 dark:bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-6 bg-slate-950 dark:bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-950 dark:text-white hover:text-accent-cyan transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
