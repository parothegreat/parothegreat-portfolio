import axios from 'axios';

import { getAvailableDevices, getNowPlaying } from '@/services/spotify';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Spotify fallbacks', () => {
  it('returns empty display data when Spotify rejects its credentials', async () => {
    mockedAxios.post.mockRejectedValue(new Error('invalid credentials'));

    await expect(getNowPlaying()).resolves.toEqual({
      status: 503,
      isPlaying: false,
      data: null,
    });
    await expect(getAvailableDevices()).resolves.toEqual({
      status: 503,
      data: [],
    });
  });
});
