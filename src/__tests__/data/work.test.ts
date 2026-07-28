import {
  DOCUMENTATION_LEVEL_LABELS,
  getWorkBySlug,
  WORK_ITEMS,
  WORK_STATUS_LABELS,
} from '@/data/work';

describe('work case-study data', () => {
  test('uses unique stable ids and route-safe slugs', () => {
    expect(WORK_ITEMS).toHaveLength(8);
    expect(new Set(WORK_ITEMS.map((item) => item.id)).size).toBe(
      WORK_ITEMS.length,
    );
    expect(new Set(WORK_ITEMS.map((item) => item.slug)).size).toBe(
      WORK_ITEMS.length,
    );

    WORK_ITEMS.forEach((item) => {
      expect(item.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(getWorkBySlug(item.slug)).toBe(item);
      expect(WORK_STATUS_LABELS[item.status]).toBeTruthy();
      expect(DOCUMENTATION_LEVEL_LABELS[item.documentationLevel]).toBeTruthy();
    });

    expect(WORK_ITEMS.map((item) => item.slug)).toEqual([
      'smart-green-hub',
      'team-it-work-order',
      'rfid-door-access',
      'school-cloud-service',
      'monitoring-stack',
      'recon-engine',
      'school-network-operations',
      'mitra-coffeeshop',
    ]);
  });

  test('publishes the Mitra Coffeeshop live and source links', () => {
    const coffeeshop = getWorkBySlug('mitra-coffeeshop');

    expect(coffeeshop?.liveUrl).toBe('https://coffeeshop.itmivhs.net');
    expect(coffeeshop?.repositoryUrl).toBe(
      'https://github.com/teamitmivhs/Mitra-Coffeeshop',
    );
  });

  test('publishes the Smart Green Hub source and dashboard preview', () => {
    const smartGreenHub = getWorkBySlug('smart-green-hub');

    expect(smartGreenHub?.repositoryUrl).toBe(
      'https://github.com/VARR-git/Smart-Green-Hub',
    );
    expect(smartGreenHub?.index).toBe(1);
    expect(smartGreenHub?.documentationLevel).toBe('deep-dive');
    expect(smartGreenHub?.evidence[0]).toMatchObject({
      type: 'image',
      source: '/images/work/smart-green-hub/main-dashboard.png',
    });
  });

  test('keeps every architecture edge connected to a real node', () => {
    WORK_ITEMS.forEach((item) => {
      const nodeIds = new Set(item.architecture.nodes.map((node) => node.id));

      expect(item.architecture.nodes.length).toBeGreaterThan(2);
      expect(item.architecture.edges.length).toBeGreaterThan(1);
      item.architecture.edges.forEach((edge) => {
        expect(nodeIds.has(edge.source)).toBe(true);
        expect(nodeIds.has(edge.target)).toBe(true);
        expect([
          'data',
          'control',
          'telemetry',
          'warning',
          'planned',
        ]).toContain(edge.semantic);
      });
    });
  });

  test('does not publish credentials or private-address evidence', () => {
    const serialized = JSON.stringify(WORK_ITEMS);

    expect(serialized).not.toMatch(
      /(?:waka_[a-z0-9-]+|AIza[a-z0-9_-]+|-----BEGIN [A-Z ]+PRIVATE KEY-----)/i,
    );
    expect(serialized).not.toMatch(
      /\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})\b/,
    );
  });

  test('publishes honest minimum documentation for every project', () => {
    WORK_ITEMS.forEach((item) => {
      const sectionIds = item.sections.map((section) => section.id);

      expect(item.caseStudyAvailable).toBe(true);
      expect(sectionIds).toEqual(
        expect.arrayContaining(['context', 'problem', 'build']),
      );
      expect(item.ownership.owned.length).toBeGreaterThan(0);
      expect(item.ownership.boundaries.length).toBeGreaterThan(0);
      expect(item.decisions.length).toBeGreaterThan(0);
      expect(item.timeline.length).toBeGreaterThan(0);
      expect(item.operations.length).toBeGreaterThan(0);
      expect(item.security.length).toBeGreaterThan(0);
      expect(item.evidence.length).toBeGreaterThan(0);
      expect(item.lessons.length).toBeGreaterThan(0);
    });
  });

  test('marks unfinished architecture nodes as planned', () => {
    const workOrder = getWorkBySlug('team-it-work-order');
    const rfid = getWorkBySlug('rfid-door-access');

    expect(
      workOrder?.architecture.nodes.find((node) => node.id === 'tracker')
        ?.status,
    ).toBe('planned');
    expect(
      rfid?.architecture.nodes.find((node) => node.id === 'camera')?.status,
    ).toBe('planned');
  });
});
