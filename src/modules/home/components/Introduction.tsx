const Introduction = () => {
  return (
    <section className='bg-cover bg-no-repeat '>
      <div className='space-y-3'>
        <div className='flex gap-2  text-2xl font-medium lg:text-3xl'>
          <h1>Hi, I&apos;m Alvaro</h1>{' '}
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-4'>
          <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-10'>
            <li>
              Based in Bekasi, Indonesia <span className='ml-1'>🇮🇩</span>
            </li>
            <li>Industrial Electronics Engineering Student</li>
          </ul>
        </div>
      </div>

      <p className='mt-6 leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose'>
        I&apos;m a SysAdmin, Junior DevOps engineer, and Cybersecurity
        enthusiast focused on practical infrastructure, Linux, networking, and
        security. I build reliable systems, automate the boring parts, and keep
        learning how real-world networks break, recover, and stay resilient.
      </p>
    </section>
  );
};

export default Introduction;
