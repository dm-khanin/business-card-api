import type { ExperienceService } from '../experience/experience.service.js';
import type { ProjectsService } from '../projects/projects.service.js';
import type { SkillsService } from '../skills/skills.service.js';
import { ProfileResolver } from './profile.resolver.js';
import type { ProfileService } from './profile.service.js';

describe('ProfileResolver', () => {
  const findProfile = vi.fn();
  const resolver = new ProfileResolver(
    { findProfile } as unknown as ProfileService,
    {} as SkillsService,
    {} as ExperienceService,
    {} as ProjectsService,
  );

  it('returns the stored profile', async () => {
    const profile = {
      id: 1,
      name: 'Jane Doe',
      title: 'Engineer',
      description: 'About me',
    };
    findProfile.mockResolvedValueOnce(profile);

    await expect(resolver.profile()).resolves.toBe(profile);
  });

  it('reports NOT_FOUND when there is no profile', async () => {
    findProfile.mockResolvedValueOnce(null);

    await expect(resolver.profile()).rejects.toMatchObject({
      message: 'Profile not found',
      extensions: { code: 'NOT_FOUND' },
    });
  });
});
