export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />
      
      {/* Animated blob elements */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-accent-cyan/5 dark:bg-accent-cyan/3 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
      <div className="absolute top-40 -right-32 w-96 h-96 bg-accent-cyan-dark/5 dark:bg-accent-cyan-dark/2 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent-cyan/3 dark:bg-accent-cyan/2 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(0,212,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.02)_1px,transparent_1px)]" />
      
      {/* Radial gradient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-radial-gradient opacity-10 dark:opacity-5" />
    </div>
  )
}
