import { parseGithubContributions } from '@/services/github';

test('parses public GitHub contribution cells and totals', () => {
  const html = `
    <h2 id="js-contribution-activity-description">
      1,089 contributions in the last year
    </h2>
    <td data-date="2026-07-26" data-level="0" class="ContributionCalendar-day"></td>
    <tool-tip>No contributions on July 26th.</tool-tip>
    <td class="ContributionCalendar-day" data-level="3" data-date="2026-07-27"></td>
    <tool-tip>12 contributions on July 27th.</tool-tip>
  `;

  expect(parseGithubContributions(html)).toEqual({
    totalContributions: 1089,
    days: [
      { date: '2026-07-26', level: 0, count: 0 },
      { date: '2026-07-27', level: 3, count: 12 },
    ],
  });
});
