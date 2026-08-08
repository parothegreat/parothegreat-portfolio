import axios from 'axios';
import querystring from 'querystring';

import { PAIR_DEVICES } from '@/common/constant/devices';
import {
  DeviceDataProps,
  DeviceResponseProps,
  NowPlayingResponseProps,
  SongProps,
} from '@/common/types/spotify';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASE_URL = 'https://api.spotify.com/v1';
const AVAILABLE_DEVICES_ENDPOINT = `${BASE_URL}/me/player/devices`;
const NOW_PLAYING_ENDPOINT = `${BASE_URL}/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async (): Promise<string | null> => {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) return null;

  try {
    const token = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      'base64',
    );
    const response = await axios.post(
      TOKEN_ENDPOINT,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
      }),
      {
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data?.access_token ?? null;
  } catch {
    return null;
  }
};

export const getAvailableDevices = async (): Promise<DeviceResponseProps> => {
  const accessToken = await getAccessToken();
  if (!accessToken) return { status: 503, data: [] };

  try {
    const response = await axios.get(AVAILABLE_DEVICES_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const status = response.status;

    if (status === 204 || status > 400) {
      return { status, data: [] };
    }

    const responseData: DeviceDataProps = response.data;

    const devices = responseData?.devices?.map((device) => ({
      name: device.name,
      is_active: device.is_active,
      type: device.type,
      model: PAIR_DEVICES[device?.type]?.model || 'Unknown Device',
      id: PAIR_DEVICES[device?.type]?.id || 'parothegreat-device',
    }));

    return {
      status,
      data: devices,
    };
  } catch {
    return { status: 503, data: [] };
  }
};

export const getNowPlaying = async (): Promise<NowPlayingResponseProps> => {
  const accessToken = await getAccessToken();
  if (!accessToken) return { status: 503, isPlaying: false, data: null };

  try {
    const response = await axios.get(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const status = response.status;

    if (status === 204 || status > 400) {
      return { status, isPlaying: false, data: null };
    }

    const responseData: SongProps = response.data;

    if (!responseData.item) {
      return { status, isPlaying: false, data: null };
    }

    const isPlaying: boolean = responseData?.is_playing;
    const album: string = responseData?.item?.album.name ?? '';
    const albumImageUrl: string | undefined =
      responseData?.item?.album?.images?.find((image) => image?.width === 640)
        ?.url ?? undefined;
    const artist: string =
      responseData?.item?.artists?.map((artist) => artist?.name).join(', ') ??
      '';
    const songUrl: string = responseData?.item?.external_urls?.spotify ?? '';
    const title: string = responseData?.item?.name ?? '';

    return {
      status,
      isPlaying,
      data: {
        album,
        albumImageUrl,
        artist,
        songUrl,
        title,
      },
    };
  } catch {
    return { status: 503, isPlaying: false, data: null };
  }
};
