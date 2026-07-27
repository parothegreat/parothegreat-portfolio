import { TOOL_DOMAINS, TOOLS } from '@/data/tools';

import { filterTools } from '@/common/libs/tools';

describe('filterTools', () => {
  test('returns every tool for the default state', () => {
    expect(filterTools(TOOLS, 'all', '')).toEqual(TOOLS);
  });

  test.each(TOOL_DOMAINS)('returns only $label tools', ({ value }) => {
    const results = filterTools(TOOLS, value, '');

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((tool) => tool.domain === value)).toBe(true);
  });

  test('combines domain filtering with project search', () => {
    const results = filterTools(TOOLS, 'security', 'Recon Engine');

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((tool) => tool.domain === 'security')).toBe(true);
    expect(results.every((tool) => tool.usedIn.includes('Recon Engine'))).toBe(
      true,
    );
  });

  test('searches names, projects, and related technologies case-insensitively', () => {
    expect(filterTools(TOOLS, 'all', 'mIkRoTiK')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'MikroTik RouterOS' }),
      ]),
    );
    expect(filterTools(TOOLS, 'all', 'RFID Door Access')).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'MFRC522' })]),
    );
    expect(filterTools(TOOLS, 'all', 'Axum')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Rust' }),
        expect.objectContaining({ name: 'Axum' }),
      ]),
    );
  });

  test('returns no tools when nothing matches', () => {
    expect(filterTools(TOOLS, 'all', 'definitely-not-a-tool')).toEqual([]);
  });
});
