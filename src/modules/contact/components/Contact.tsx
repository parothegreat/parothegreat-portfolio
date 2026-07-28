import Link from 'next/link';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';

import { PROFILE } from '@/data/profile';
import { SOCIAL_LINKS, SocialLinkIcon } from '@/data/social-links';

import ContactForm from './ContactForm';

const SOCIAL_ICONS: Record<SocialLinkIcon, React.ComponentType> = {
  email: FiMail,
  github: BsGithub,
  linkedin: BsLinkedin,
  instagram: FiMail,
};

const Contact = () => {
  return (
    <div className='grid gap-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12'>
      <div>
        <p className='signal-label'>Availability</p>
        <h2 className='mt-3 text-2xl font-medium leading-snug text-[var(--text-primary)]'>
          Let&apos;s talk about systems that need to work reliably.
        </h2>
        <p className='mt-4 text-base leading-7 text-[var(--text-secondary)]'>
          I&apos;m open to junior infrastructure, DevOps, backend, security, and
          technical collaboration opportunities.
        </p>

        <div className='instrument-surface mt-7 rounded-lg p-5'>
          <div className='flex items-start gap-3'>
            <span
              aria-hidden='true'
              className='mt-2 h-2 w-2 shrink-0 rounded-sm bg-[var(--telemetry-500)]'
            />
            <div>
              <p className='font-medium text-[var(--text-primary)]'>
                Open to opportunities
              </p>
              <p className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
                Bekasi, Indonesia · {PROFILE.timezone}
              </p>
            </div>
          </div>
        </div>

        <dl className='mt-8 border-y border-[var(--line-default)]'>
          <div className='border-b border-[var(--line-default)] py-4'>
            <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
              Preferred topics
            </dt>
            <dd className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
              Infrastructure · DevOps · Backend · Security · Collaboration
            </dd>
          </div>
          <div className='py-4'>
            <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
              Direct email
            </dt>
            <dd className='mt-2'>
              <Link
                href='mailto:alvaroprayogo38@gmail.com'
                className='inline-flex min-h-[44px] items-center gap-2 break-all text-sm font-medium text-[var(--circuit-500)] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
              >
                alvaroprayogo38@gmail.com
                <FiArrowUpRight aria-hidden='true' className='shrink-0' />
              </Link>
            </dd>
          </div>
        </dl>

        <div className='mt-7 flex items-center gap-2'>
          {SOCIAL_LINKS.filter(
            (item) => item.visible && item.icon !== 'email',
          ).map((item) => {
            const Icon = SOCIAL_ICONS[item.icon];

            return (
              <Link
                key={item.id}
                href={item.href}
                aria-label={item.label}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--line-default)] text-[var(--text-secondary)] outline-none transition-colors hover:border-[var(--line-strong)] hover:text-[var(--circuit-500)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] motion-reduce:transition-none'
              >
                <Icon aria-hidden='true' />
              </Link>
            );
          })}
        </div>
      </div>

      <section aria-labelledby='contact-form-heading'>
        <p className='signal-label'>Message</p>
        <h2
          id='contact-form-heading'
          className='mt-3 text-2xl font-medium text-[var(--text-primary)]'
        >
          Start a conversation
        </h2>
        <p className='mt-3 text-sm leading-6 text-[var(--text-secondary)]'>
          Share the context, technical topic, or opportunity you have in mind.
        </p>
        <div className='mt-7'>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Contact;
