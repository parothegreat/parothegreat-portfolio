const GITHUB_USERNAME = 'parothegreat';
const CONTRIBUTIONS_URL = `https://github.com/users/${GITHUB_USERNAME}/contributions`;

export interface GithubContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GithubContributionData {
  username: string;
  totalContributions: number;
  days: GithubContributionDay[];
  updatedAt: string;
}

export const parseGithubContributions = (
  html: string,
): Omit<GithubContributionData, 'username' | 'updatedAt'> => {
  const totalMatch = html.match(
    /id="js-contribution-activity-description"[\s\S]*?([\d,]+)\s+contributions?/i,
  );
  const cellPattern =
    /<td\b(?=[^>]*\bdata-date="([^"]+)")(?=[^>]*\bdata-level="([0-4])")[^>]*>\s*<\/td>\s*<tool-tip\b[^>]*>([\s\S]*?)<\/tool-tip>/gi;
  const days: GithubContributionDay[] = [];
  let match = cellPattern.exec(html);

  while (match) {
    const tooltip = match[3].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const countMatch = tooltip.match(/([\d,]+)\s+contributions?/i);

    days.push({
      date: match[1],
      level: Number(match[2]),
      count: countMatch ? Number(countMatch[1].replace(/,/g, '')) : 0,
    });

    match = cellPattern.exec(html);
  }

  if (!days.length) {
    throw new Error('GitHub contribution data was not found');
  }

  days.sort((first, second) => first.date.localeCompare(second.date));

  return {
    totalContributions: totalMatch
      ? Number(totalMatch[1].replace(/,/g, ''))
      : days.reduce((total, day) => total + day.count, 0),
    days,
  };
};

export const getGithubContributions =
  async (): Promise<GithubContributionData> => {
    const response = await fetch(CONTRIBUTIONS_URL, {
      headers: {
        Accept: 'text/html',
        'User-Agent': 'parothegreat-portfolio',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    return {
      username: GITHUB_USERNAME,
      ...parseGithubContributions(await response.text()),
      updatedAt: new Date().toISOString(),
    };
  };
