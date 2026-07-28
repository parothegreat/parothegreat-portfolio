import { WORK_ITEMS } from '@/data/work';
import {
  getPrimaryWorkMedia,
  getWorkMedia,
  WORK_MEDIA,
} from '@/data/work-media';

describe('work media registry', () => {
  test('uses unique ids and resolves every project media reference', () => {
    expect(new Set(WORK_MEDIA.map((item) => item.id)).size).toBe(
      WORK_MEDIA.length,
    );

    WORK_ITEMS.forEach((project) => {
      const media = getWorkMedia(project.mediaIds);

      expect(media).toHaveLength(project.mediaIds.length);
      expect(media.every((item) => item.projectSlug === project.slug)).toBe(
        true,
      );
      expect(getPrimaryWorkMedia(project.mediaIds)).toBeTruthy();
    });
  });

  test('uses real Smart Green Hub media and honest fallbacks elsewhere', () => {
    const smartGreenHub = WORK_ITEMS.find(
      (project) => project.slug === 'smart-green-hub',
    );
    const smartMedia = getWorkMedia(smartGreenHub?.mediaIds ?? []);

    expect(smartMedia.filter((item) => item.type === 'image')).toHaveLength(5);
    expect(smartMedia.map((item) => item.src)).toEqual(
      expect.arrayContaining([
        '/images/work/smart-green-hub/main-dashboard.png',
        '/images/work/smart-green-hub/warning.png',
        '/images/work/smart-green-hub/report.png',
        '/images/work/smart-green-hub/settings.png',
        '/images/work/smart-green-hub/leaf.svg',
      ]),
    );

    WORK_MEDIA.filter((item) => item.type === 'placeholder').forEach((item) => {
      expect(item.src).toBeUndefined();
      expect(item.placeholderState).toBeTruthy();
      expect(item.placeholderLabel).toMatch(/PENDING$/);
    });
  });
});
