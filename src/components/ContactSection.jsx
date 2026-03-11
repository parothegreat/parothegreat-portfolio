import { motion } from 'framer-motion'

export default function ContactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: 'alvaroprayogo38@gmail.com',
      href: 'mailto:alvaroprayogo38@gmail.com',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Moehammad Alvaro Pirata Prayogo',
      href: 'https://www.linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a/',
    },
    {
      icon: '⚙️',
      label: 'GitHub',
      value: '@parothegreat',
      href: 'https://github.com/parothegreat',
    },
  ]

  const interestAreas = [
    'Security Operations Center (SOC)',
    'Network Security',
    'Penetration Testing',
    'System Administration',
    'Infrastructure Engineering',
  ]

  return (
    <section id="contact" className="section section-light">
      <div className="container">
        <motion.h2
          className="text-4xl md:text-5xl font-black mb-12 text-accent-cyan"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Mari Terhubung
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 className="text-2xl font-bold text-accent-cyan mb-4" variants={itemVariants}>
              Hubungi Saya
            </motion.h3>
            <motion.p className="text-lg leading-relaxed mb-8 opacity-90" variants={itemVariants}>
              Saya terbuka untuk diskusi tentang cybersecurity, networking, atau peluang kolaborasi. Jangan ragu untuk menghubungi!
            </motion.p>

            <div className="space-y-4">
              {contactMethods.map((method) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-900 hover:border-accent-cyan border-2 border-transparent hover:bg-accent-cyan/5 transition-all"
                  variants={itemVariants}
                >
                  <span className="text-2xl min-w-max">{method.icon}</span>
                  <div>
                    <p className="font-bold text-accent-cyan text-sm">{method.label}</p>
                    <p className="text-sm opacity-70">{method.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Availability */}
          <motion.div
            className="bg-gray-50 dark:bg-slate-900 p-8 rounded-lg border-l-4 border-accent-cyan"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 className="text-2xl font-bold text-accent-cyan mb-4" variants={itemVariants}>
              Status Ketersediaan
            </motion.h3>

            <motion.div
              className="inline-flex items-center gap-2 bg-accent-cyan/10 text-accent-cyan px-4 py-2 rounded-full border border-accent-cyan font-bold mb-6"
              variants={itemVariants}
            >
              <motion.span
                className="inline-block w-3 h-3 bg-accent-cyan rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Open to Work
            </motion.div>

            <motion.p className="text-lg leading-relaxed mb-6 opacity-90" variants={itemVariants}>
              Saya sedang mencari peluang di bidang Cybersecurity, Network Engineering, atau System Administration.
            </motion.p>

            <motion.div variants={itemVariants}>
              <p className="font-bold text-accent-cyan mb-4">Area Minat:</p>
              <ul className="space-y-2">
                {interestAreas.map((area) => (
                  <li key={area} className="pl-6 relative before:absolute before:left-0 before:content-['→'] before:text-accent-cyan before:font-bold text-sm opacity-80">
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
