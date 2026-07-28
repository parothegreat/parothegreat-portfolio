import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import ContactForm from '@/modules/contact/components/ContactForm';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const fillForm = async () => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Name'), 'Alvaro');
  await user.type(screen.getByLabelText('Email'), 'alvaro@example.com');
  await user.type(screen.getByLabelText('Subject'), 'Infrastructure role');
  await user.type(
    screen.getByLabelText('Message'),
    'I would like to discuss a technical opportunity.',
  );
  return user;
};

describe('ContactForm', () => {
  beforeEach(() => mockedAxios.post.mockReset());

  test('validates every required field without discarding input', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('Name'), 'Alvaro');
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(screen.getByLabelText('Name')).toHaveValue('Alvaro');
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument();
    expect(screen.getByText('Enter a subject.')).toBeInTheDocument();
    expect(screen.getByText('Enter your message.')).toBeInTheDocument();
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  test('announces success and resets fields after a real response', async () => {
    mockedAxios.post.mockResolvedValue({ status: 200 });
    render(<ContactForm />);
    const user = await fillForm();

    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(
      await screen.findByText('Message sent successfully.'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
  });

  test('keeps form data when the provider fails', async () => {
    mockedAxios.post.mockRejectedValue(new Error('offline'));
    render(<ContactForm />);
    const user = await fillForm();

    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(
      await screen.findByText(/Message could not be sent/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toHaveValue('Infrastructure role');
  });
});
