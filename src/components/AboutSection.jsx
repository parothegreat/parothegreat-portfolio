import { motion } from 'framer-motion'

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const badgeVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const statVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: custom * 0.1 },
    }),
  }

  return (
    <section id="about" className="section section-light">
      <div className="container">
        <motion.h2
          className="text-4xl md:text-5xl font-black mb-12 text-accent-cyan"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Tentang Saya
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Text */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p className="text-lg leading-relaxed text-slate-900 dark:text-gray-100" variants={itemVariants}>
              Saya adalah seorang siswa SMK jurusan Teknik Elektronika Industri yang passionate tentang cybersecurity dan networking. Dengan sertifikasi dari Cisco NetAcad di bidang Network Defense dan Ethical Hacking, saya siap untuk berkembang di dunia cybersecurity.
            </motion.p>

            <motion.p className="text-lg leading-relaxed text-slate-900 dark:text-gray-100" variants={itemVariants}>
              Ketertarikan saya dalam Linux, Network Engineering, dan Infrastructure Security mendorong saya untuk terus belajar dan mengembangkan skills di bidang cybersecurity. Saya terbuka untuk peluang kerja di bidang ini.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8">
              <h3 className="text-2xl font-bold text-accent-cyan mb-4">Latar Belakang Pendidikan</h3>
              <motion.div
                className="flex gap-4 bg-gray-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-accent-cyan hover:translate-x-2 transition-transform"
                variants={badgeVariants}
              >
                <img
                  src="/images/logos/SMK_Mitra_Industri.png"
                  alt="SMK Mitra Industri"
                  className="w-24 h-24 object-contain border-2 border-accent-cyan rounded p-2 flex-shrink-0"
                />
                <div>
                  <p className="font-bold text-accent-cyan">SMK Mitra Industri MM2100</p>
                  <p className="text-sm text-slate-700 dark:text-gray-300 opacity-80 dark:opacity-100">Teknik Elektronika Industri</p>
                  <p className="text-sm text-slate-600 dark:text-gray-400 opacity-60 dark:opacity-80">Kabupaten Bekasi, Jawa Barat</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-accent-cyan mb-4">Fokus & Keahlian</h3>
              <ul className="space-y-3">
                <li className="pl-6 relative before:absolute before:left-0 before:content-['▸'] before:text-accent-cyan before:font-bold text-slate-900 dark:text-gray-100">
                  <strong>Cybersecurity:</strong> Network Defense, Ethical Hacking, Security Protocols
                </li>
                <li className="pl-6 relative before:absolute before:left-0 before:content-['▸'] before:text-accent-cyan before:font-bold text-slate-900 dark:text-gray-100">
                  <strong>Networking:</strong> Network Infrastructure, Configuration, Troubleshooting
                </li>
                <li className="pl-6 relative before:absolute before:left-0 before:content-['▸'] before:text-accent-cyan before:font-bold text-slate-900 dark:text-gray-100">
                  <strong>Sistem:</strong> Linux Administration, System Security
                </li>
                <li className="pl-6 relative before:absolute before:left-0 before:content-['▸'] before:text-accent-cyan before:font-bold text-slate-900 dark:text-gray-100">
                  <strong>Teknik:</strong> Industrial Electronics, DIY Projects
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: '2', label: 'Sertifikasi Cisco' },
              { number: '∞', label: 'Learning Journey' },
              { number: '100%', label: 'Committed' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="bg-gray-50 dark:bg-slate-900 p-6 rounded-lg border-l-4 border-accent-cyan hover:translate-x-2 transition-transform"
                custom={idx}
                variants={statVariants}
              >
                <div className="text-4xl font-black text-accent-cyan">{stat.number}</div>
                <div className="text-sm text-slate-700 dark:text-gray-300 opacity-80 dark:opacity-100 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
