import { motion } from 'framer-motion'

export default function CertificationsSection() {
  const certifications = [
    {
      type: 'image',
      title: 'Network Defense',
      date: 'Completion Date: 28 Feb 2026',
      image: '/images/certificates/network_defense.png',
      credlyLink: 'https://www.credly.com/badges/26767ad4-478f-47d2-bd76-c30903affef0',
    },
    {
      type: 'image',
      title: 'Ethical Hacker',
      date: 'Completion Date: 16 Feb 2026',
      image: '/images/certificates/ethical_hacker.jpg',
      credlyLink: 'https://www.credly.com/badges/26767ad4-478f-47d2-bd76-c30903affef0/linked_in_profile',
    },
    {
      type: 'card',
      title: 'SMK Mitra Industri MM2100',
      issuer: 'Vocational High School',
      description: 'Teknik Elektronika Industri dengan fokus pada network infrastructure dan cybersecurity',
      skills: ['Electronics', 'Networking', 'Industrial Engineering', 'Security Basics'],
    },
  ]

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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="certifications" className="section section-light">
      <div className="container">
        <motion.h2
          className="text-4xl md:text-5xl font-black mb-4 text-accent-cyan"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Sertifikasi & Kredensial
        </motion.h2>
        <motion.p
          className="text-center opacity-70 dark:opacity-60 text-lg mb-12 text-slate-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Sertifikasi profesional dari Cisco NetAcad
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert, idx) => (
            <motion.div key={cert.title} variants={itemVariants} custom={idx}>
              {cert.type === 'image' ? (
                <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border-2 border-accent-cyan hover:-translate-y-2 transition-transform shadow-md">
                  <div className="bg-gray-200 dark:bg-slate-700 h-64 overflow-hidden flex items-center justify-center">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-accent-cyan mb-2">{cert.title}</h3>
                    <p className="text-sm text-slate-700 dark:text-gray-400 opacity-70 dark:opacity-80 mb-4">{cert.date}</p>
                    <a
                      href={cert.credlyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-accent-cyan/10 text-accent-cyan border border-accent-cyan rounded hover:bg-accent-cyan hover:text-slate-950 transition-all text-sm font-semibold"
                    >
                      View on Credly →
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border-l-4 border-accent-cyan hover:-translate-y-2 transition-transform">
                  <h3 className="text-lg font-bold text-accent-cyan mb-2">{cert.title}</h3>
                  <p className="text-sm opacity-70 mb-3">{cert.issuer}</p>
                  <p className="text-sm mb-4 leading-relaxed">{cert.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-accent-cyan/10 text-accent-cyan rounded border border-accent-cyan text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
