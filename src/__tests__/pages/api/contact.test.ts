import { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/contact';
import { sendMessage } from '@/services/contact';

jest.mock('@/services/contact', () => ({
  sendMessage: jest.fn(),
}));

const mockedSendMessage = sendMessage as jest.MockedFunction<
  typeof sendMessage
>;

const createResponse = () => {
  const response = {
    setHeader: jest.fn(),
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  (response.status as jest.Mock).mockReturnValue(response);
  return response;
};

describe('/api/contact', () => {
  beforeEach(() => {
    process.env.CONTACT_FORM_API_KEY = 'test-key';
    mockedSendMessage.mockReset();
  });

  test('rejects unsupported methods and invalid input', async () => {
    const methodResponse = createResponse();
    await handler({ method: 'GET' } as NextApiRequest, methodResponse);
    expect(methodResponse.status).toHaveBeenCalledWith(405);

    const inputResponse = createResponse();
    await handler(
      {
        method: 'POST',
        body: {
          formData: {
            name: 'Alvaro',
            email: 'not-an-email',
            subject: 'Hello',
            message: 'Test',
          },
        },
      } as NextApiRequest,
      inputResponse,
    );
    expect(inputResponse.status).toHaveBeenCalledWith(400);
    expect(mockedSendMessage).not.toHaveBeenCalled();
  });

  test('forwards only validated contact fields', async () => {
    mockedSendMessage.mockResolvedValue({
      status: 200,
      data: { message: 'sent' },
    });
    const response = createResponse();

    await handler(
      {
        method: 'POST',
        body: {
          formData: {
            name: ' Alvaro ',
            email: ' alvaro@example.com ',
            subject: ' Infrastructure ',
            message: ' Hello ',
          },
        },
      } as NextApiRequest,
      response,
    );

    expect(mockedSendMessage).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
  });
});
