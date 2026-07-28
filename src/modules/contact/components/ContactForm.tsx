import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FiSend } from 'react-icons/fi';

interface ContactFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FIELDS: ContactFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const validate = (fields: ContactFields) => {
  const errors: Partial<ContactFields> = {};

  if (!fields.name.trim()) errors.name = 'Enter your name.';
  if (!fields.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!fields.subject.trim()) errors.subject = 'Enter a subject.';
  if (!fields.message.trim()) errors.message = 'Enter your message.';

  return errors;
};

const ContactForm = () => {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState<Partial<ContactFields>>({});
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const key = name as keyof ContactFields;

    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(fields);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      await axios.post('/api/contact', { formData: fields });
      setFields(INITIAL_FIELDS);
      setErrors({});
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const fieldClassName =
    'mt-2 min-h-[46px] w-full rounded-md border border-[var(--line-default)] bg-[var(--surface-1)] px-3 py-2 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)] focus:border-[var(--circuit-500)] focus:ring-2 focus:ring-[var(--accent-soft)]';
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className='grid gap-5 sm:grid-cols-2'>
        <div>
          <label
            htmlFor='contact-name'
            className='text-sm font-medium text-[var(--text-primary)]'
          >
            Name
          </label>
          <input
            id='contact-name'
            name='name'
            type='text'
            autoComplete='name'
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            aria-invalid={Boolean(errors.name)}
            className={fieldClassName}
            onChange={handleChange}
            value={fields.name}
          />
          {errors.name ? (
            <p
              id='contact-name-error'
              className='mt-2 text-sm text-[var(--fault-500)]'
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor='contact-email'
            className='text-sm font-medium text-[var(--text-primary)]'
          >
            Email
          </label>
          <input
            id='contact-email'
            name='email'
            type='email'
            autoComplete='email'
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            aria-invalid={Boolean(errors.email)}
            className={fieldClassName}
            onChange={handleChange}
            value={fields.email}
          />
          {errors.email ? (
            <p
              id='contact-email-error'
              className='mt-2 text-sm text-[var(--fault-500)]'
            >
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className='mt-5'>
        <label
          htmlFor='contact-subject'
          className='text-sm font-medium text-[var(--text-primary)]'
        >
          Subject
        </label>
        <input
          id='contact-subject'
          name='subject'
          type='text'
          aria-describedby={
            errors.subject ? 'contact-subject-error' : undefined
          }
          aria-invalid={Boolean(errors.subject)}
          className={fieldClassName}
          onChange={handleChange}
          value={fields.subject}
        />
        {errors.subject ? (
          <p
            id='contact-subject-error'
            className='mt-2 text-sm text-[var(--fault-500)]'
          >
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className='mt-5'>
        <label
          htmlFor='contact-message'
          className='text-sm font-medium text-[var(--text-primary)]'
        >
          Message
        </label>
        <textarea
          id='contact-message'
          name='message'
          rows={6}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
          aria-invalid={Boolean(errors.message)}
          className={fieldClassName}
          onChange={handleChange}
          value={fields.message}
        />
        {errors.message ? (
          <p
            id='contact-message-error'
            className='mt-2 text-sm text-[var(--fault-500)]'
          >
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className='mt-6 flex flex-col gap-4 sm:flex-row sm:items-center'>
        <button
          type='submit'
          disabled={status === 'submitting'}
          className='inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md bg-[var(--circuit-500)] px-5 text-sm font-medium text-[var(--accent-contrast)] outline-none transition-colors hover:bg-[var(--accent-hover)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none'
        >
          <FiSend aria-hidden='true' />
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>

        <p aria-live='polite' className='text-sm leading-6'>
          {status === 'success' ? (
            <span className='text-[var(--telemetry-500)]'>
              Message sent successfully.
            </span>
          ) : null}
          {status === 'error' && !hasErrors ? (
            <span className='text-[var(--fault-500)]'>
              Message could not be sent. Your text is still here; try again or
              use email.
            </span>
          ) : null}
          {status === 'error' && hasErrors ? (
            <span className='text-[var(--fault-500)]'>
              Review the highlighted fields.
            </span>
          ) : null}
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
