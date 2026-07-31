import axios from 'axios';

import { isWakaTimeRange } from '@/common/constant/wakatime';
import { getReadStats } from '@/services/wakatime';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getReadStats', () => {
  it('returns only display-safe coding categories and language fields', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        data: {
          categories: [
            { name: 'AI Coding', percent: 80, ai_model_costs: { GPT: 10 } },
            { name: 'Coding', percent: 15 },
            { name: 'Writing Docs', percent: 5 },
          ],
          languages: [
            {
              name: 'TypeScript',
              percent: 75,
              ai_coding_seconds: '1000',
            },
          ],
          editors: [{ name: 'Codex', ai_input_tokens: 123 }],
        },
      },
    });

    const response = await getReadStats('last_30_days');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/stats/last_30_days'),
      expect.any(Object),
    );
    expect(response.data.categories).toEqual([
      { name: 'Coding', percent: 95 },
      { name: 'Writing Docs', percent: 5 },
    ]);
    expect(response.data.languages).toEqual([
      { name: 'TypeScript', percent: 75 },
    ]);
    expect(response.data).not.toHaveProperty('editors');
  });

  it('accepts only supported public statistic ranges', () => {
    expect(isWakaTimeRange('all_time')).toBe(true);
    expect(isWakaTimeRange('../../settings')).toBe(false);
  });
});
