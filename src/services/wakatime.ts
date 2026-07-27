/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import {
  DEFAULT_WAKATIME_RANGE,
  WakaTimeRange,
} from '@/common/constant/wakatime';

const API_KEY = process.env.WAKATIME_API_KEY;

const STATS_ENDPOINT = 'https://wakatime.com/api/v1/users/current/stats';

interface WakaTimeItem {
  name: string;
  percent?: number;
}

export const getReadStats = async (
  range: WakaTimeRange = DEFAULT_WAKATIME_RANGE,
): Promise<{
  status: number;
  data: any;
}> => {
  const response = await axios.get(`${STATS_ENDPOINT}/${range}`, {
    headers: {
      Authorization: `Basic ${API_KEY}`,
    },
  });

  const status = response.status;

  if (status >= 400) return { status, data: [] };

  const getData = response.data;

  const start_date = getData?.data?.start;
  const end_date = getData?.data?.end;
  const last_update = getData?.data?.modified_at;

  const rawCategories: WakaTimeItem[] = getData?.data?.categories ?? [];
  const categories = [
    {
      name: 'Coding',
      percent: rawCategories
        .filter(({ name }) => name === 'AI Coding' || name === 'Coding')
        .reduce((total, { percent = 0 }) => total + percent, 0),
    },
    ...rawCategories
      .filter(({ name }) => name !== 'AI Coding' && name !== 'Coding')
      .map(({ name, percent }) => ({ name, percent })),
  ];

  const best_day = {
    date: getData?.data?.best_day?.date,
    text: getData?.data?.best_day?.text,
  };
  const human_readable_daily_average =
    getData?.data?.human_readable_daily_average_including_other_language;
  const human_readable_total =
    getData?.data?.human_readable_total_including_other_language;

  const languages = (getData?.data?.languages ?? [])
    .slice(0, 3)
    .map(({ name, percent }: WakaTimeItem) => ({ name, percent }));

  return {
    status,
    data: {
      last_update,
      start_date,
      end_date,
      categories,
      best_day,
      human_readable_daily_average,
      human_readable_total,
      languages,
    },
  };
};
