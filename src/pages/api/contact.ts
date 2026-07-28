import { NextApiRequest, NextApiResponse } from 'next';

import { sendMessage } from '@/services/contact';

const isValidText = (value: unknown, maxLength: number) =>
  typeof value === 'string' &&
  value.trim().length > 0 &&
  value.trim().length <= maxLength;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const formApiKey = process.env.CONTACT_FORM_API_KEY;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!formApiKey) {
    return res.status(503).json({ error: 'Contact form is unavailable.' });
  }

  const { formData } = req.body ?? {};
  if (
    !formData ||
    !isValidText(formData.name, 100) ||
    !isValidText(formData.email, 254) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) ||
    !isValidText(formData.subject, 160) ||
    !isValidText(formData.message, 5000)
  ) {
    return res.status(400).json({ error: 'Invalid contact form data.' });
  }

  try {
    const updatedFormData = new FormData();
    updatedFormData.append('access_key', formApiKey);
    updatedFormData.append('name', formData.name.trim());
    updatedFormData.append('email', formData.email.trim());
    updatedFormData.append('subject', formData.subject.trim());
    updatedFormData.append('message', formData.message.trim());

    const response = await sendMessage(updatedFormData);

    return res
      .status(response.status)
      .json({ status: response.status, message: response?.data?.message });
  } catch {
    return res.status(502).json({ error: 'Contact provider unavailable.' });
  }
}
