import { motion } from 'framer-motion'

export default function SkillsSection() {
  const skills = [
    {
      title: 'Cybersecurity',
      badge: 'CISCO CERTIFIED',
      items: ['Network Defense', 'Ethical Hacking', 'Security Assessment', 'Penetration Testing (dasar)', 'Security Best Practices', 'Firewall Configuration'],
    },
    {
      title: 'Networking',
      badge: 'CISCO EXPERTISE',
      items: ['Network Architecture', 'Cisco Router/Switch', 'TCP/IP Networking', 'Network Protocols', 'VLAN Configuration', 'Network Troubleshooting'],
    },
    {
      title: 'Linux & Systems',
      badge: 'SYSADMIN',
      items: ['Linux Administration', 'Command Line Interface', 'System Security', 'User Management', 'Server Configuration', 'Log Analysis'],
    },
    {
      title: 'Technical & Other',
      badge: 'ENGINEERING',
      items: ['Electronics Engineering', 'Robotics & Arduino', 'AI/ML Interest', 'Problem Solving', 'Technical Documentation', 'Team Collaboration'],
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
    <section id="skills" className="section section-card">
      <div className="container">
        <motion.h2
          className="text-4xl md:text-5xl font-black mb-12 text-accent-cyan"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills & Keahlian
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skillGroup, idx) => (
            <motion.div
              key={skillGroup.title}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg border-t-4 border-accent-cyan hover:-translate-y-1 transition-transform"
              variants={itemVariants}
              custom={idx}
            >
              <h3 className="text-lg font-bold text-accent-cyan mb-3">{skillGroup.title}</h3>
              <div className="inline-block bg-accent-cyan/10 text-accent-cyan px-3 py-1 rounded-full text-xs font-bold border border-accent-cyan mb-4">
                {skillGroup.badge}
              </div>
              <ul className="space-y-2">
                {skillGroup.items.map((item) => (
                  <li key={item} className="text-sm pb-2 border-b border-gray-200 dark:border-slate-700 last:border-0">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
