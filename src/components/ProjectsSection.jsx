import { motion } from 'framer-motion'

export default function ProjectsSection() {
  const projects = [
    {
      icon: '🔧',
      title: 'Network Infrastructure Lab',
      description: 'Merancang dan mengimplementasikan network infrastructure dengan Cisco devices, termasuk routing, switching, dan basic security configuration.',
      tags: ['Cisco', 'Networking', 'Security'],
    },
    {
      icon: '🖥️',
      title: 'Linux Server Administration',
      description: 'Pengalaman dalam setup dan maintenance Linux servers, user management, security hardening, dan basic system administration tasks.',
      tags: ['Linux', 'Administration', 'Security'],
    },
    {
      icon: '🤖',
      title: 'Robotics & Electronics Projects',
      description: 'Berbagai project Arduino dan microcontroller, termasuk automation systems dan IoT dasar sebagai bagian dari kurikulum SMK.',
      tags: ['Arduino', 'IoT', 'Electronics'],
    },
    {
      icon: '📚',
      title: 'Continuous Learning',
      description: 'Aktif belajar dan mengikuti course online di bidang cybersecurity, networking, dan system administration untuk upgrade skills.',
      tags: ['Learning', 'Development', 'Cybersecurity'],
    },
  ]

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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="projects" className="section section-card">
      <div className="container">
        <motion.h2
          className="text-4xl md:text-5xl font-black mb-12 text-accent-cyan"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Project & Pengalaman
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-accent-cyan hover:-translate-y-1 transition-all"
              variants={itemVariants}
              custom={idx}
            >
              <div className="text-4xl mb-4">{project.icon}</div>
              <h3 className="text-lg font-bold text-accent-cyan mb-3">{project.title}</h3>
              <p className="text-sm leading-relaxed mb-4 opacity-90">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-accent-cyan/10 text-accent-cyan rounded text-xs border border-accent-cyan font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
