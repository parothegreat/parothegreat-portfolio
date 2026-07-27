import { TOOL_DOMAINS, TOOL_STATUSES, TOOLS } from '@/data/tools';

describe('tools data', () => {
  test('uses unique stable identifiers, slugs, and names', () => {
    const ids = TOOLS.map((tool) => tool.id);
    const slugs = TOOLS.map((tool) => tool.slug);
    const names = TOOLS.map((tool) => tool.name.toLowerCase());

    expect(new Set(ids).size).toBe(TOOLS.length);
    expect(new Set(slugs).size).toBe(TOOLS.length);
    expect(new Set(names).size).toBe(TOOLS.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/));
  });

  test('only uses valid domains and statuses with complete content', () => {
    const domains = new Set(TOOL_DOMAINS.map((domain) => domain.value));
    const statuses = new Set(TOOL_STATUSES);

    TOOLS.forEach((tool) => {
      expect(domains.has(tool.domain)).toBe(true);
      expect(statuses.has(tool.status)).toBe(true);
      expect(tool.description.trim()).not.toBe('');
      expect(tool.usedIn.length).toBeGreaterThan(0);
    });
  });

  test('contains the approved featured tools in the main dataset', () => {
    const featuredNames = TOOLS.filter((tool) => tool.featured).map(
      (tool) => tool.name,
    );

    expect(featuredNames).toEqual([
      'Go',
      'Linux',
      'Fedora',
      'Ubuntu Server',
      'Docker',
      'Nginx',
      'Cloudflare Tunnel',
      'Git',
      'MikroTik RouterOS',
      'Cisco IOS',
      'Grafana',
      'Prometheus',
    ]);
    TOOLS.filter((tool) => tool.featured).forEach((tool) => {
      expect(tool.role).toBeTruthy();
    });
  });
});
