import { NextApiRequest, NextApiResponse } from 'next';

import {
  DEFAULT_WAKATIME_RANGE,
  isWakaTimeRange,
} from '@/common/constant/wakatime';
import { getReadStats } from '@/services/wakatime';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const requestedRange = Array.isArray(req.query.range)
    ? req.query.range[0]
    : req.query.range;

  if (requestedRange && !isWakaTimeRange(requestedRange)) {
    res.status(400).json({ message: 'Invalid WakaTime range' });
    return;
  }

  const range = isWakaTimeRange(requestedRange)
    ? requestedRange
    : DEFAULT_WAKATIME_RANGE;

  try {
    const readStatsResponse = await getReadStats(range);

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30',
    );

    res.status(200).json(readStatsResponse.data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
