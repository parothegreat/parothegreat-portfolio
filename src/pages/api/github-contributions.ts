import { NextApiRequest, NextApiResponse } from 'next';

import {
  getGithubContributions,
  GithubContributionData,
} from '@/services/github';

type ErrorResponse = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GithubContributionData | ErrorResponse>,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const contributions = await getGithubContributions();

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=3600',
    );
    res.status(200).json(contributions);
  } catch {
    res.status(502).json({ message: 'GitHub activity is unavailable' });
  }
}
