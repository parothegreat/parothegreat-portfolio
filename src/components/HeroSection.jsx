import { motion } from 'framer-motion'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.6 + custom * 0.1 },
    }),
  }

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-cyan via-accent-cyan-dark to-accent-cyan animate-gradient">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-950 to-slate-800 dark:from-white dark:to-gray-100 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Moehammad Alvaro Pirata Prayogo
            </motion.h1>

            <motion.p
              className="text-2xl font-bold text-slate-900 dark:text-accent-cyan"
              variants={itemVariants}
            >
              SysAdmin & Cybersecurity Enthusiast
            </motion.p>

            <motion.p
              className="text-lg font-semibold text-slate-800 dark:text-gray-200 leading-relaxed"
              variants={itemVariants}
            >
              SMK Industrial Electronics Engineering | Cisco Certified | Open to Cybersecurity Opportunities
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              <motion.a
                href="https://www.linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                custom={0}
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                LinkedIn
              </motion.a>

              <motion.a
                href="https://github.com/parothegreat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                custom={1}
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </motion.a>

              <motion.a
                href="mailto:alvaroprayogo38@gmail.com"
                className="btn btn-accent"
                custom={2}
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Email
              </motion.a>

              <motion.a
                href="#contact"
                className="btn btn-outline"
                custom={3}
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lebih Lanjut
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="flex justify-center items-center"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.img
              src="/images/profile/pfp.jpeg"
              alt="Moehammad Alvaro Pirata Prayogo"
              className="w-full max-w-xs md:max-w-md rounded-lg border-4 border-slate-950 dark:border-white shadow-2xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ y: -10, boxShadow: '0 20px 50px rgba(0, 212, 255, 0.4)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
