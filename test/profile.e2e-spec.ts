import { execFileSync } from 'node:child_process';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { profile as seed } from '../prisma/seed-data.js';
import { AppModule } from '../src/app.module.js';
import { ExperienceService } from '../src/experience/experience.service.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { ProjectsService } from '../src/projects/projects.service.js';
import { SkillsService } from '../src/skills/skills.service.js';

type Profile = {
  name: string;
  description: string;
  links: { url: string }[];
  skills: { name: string }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
  }[];
  projects: { name: string }[];
};

type GraphQLResponse = {
  data?: { profile: Profile } | null;
  errors?: { message: string; extensions?: { code?: string } }[];
};

function runSeed() {
  execFileSync('npx', ['prisma', 'db', 'seed'], { stdio: 'ignore' });
}

describe('Profile (e2e)', () => {
  let app: INestApplication<App>;

  async function sendQuery(query: string): Promise<GraphQLResponse> {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);
    return response.body as GraphQLResponse;
  }

  async function getProfile(fields: string): Promise<Profile> {
    const { data, errors } = await sendQuery(`{ profile { ${fields} } }`);
    expect(errors).toBeUndefined();
    if (!data) {
      throw new Error('GraphQL response has no data');
    }
    return data.profile;
  }

  beforeAll(async () => {
    runSeed();
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('answers the example query from the assignment', async () => {
    const profile = await getProfile(`
      name
      description
      skills { name }
      experience { company position }
      projects { name }
    `);

    expect(profile.name).toBe(seed.name);
    expect(profile.description).toBe(seed.description);
    expect(profile.skills).toHaveLength(seed.skills.create.length);
    expect(profile.experience).toHaveLength(seed.experience.create.length);
    expect(profile.projects.map((project) => project.name)).toEqual(
      seed.projects.create.map((project) => project.name),
    );
  });

  it('returns the profile links', async () => {
    const profile = await getProfile('links { url }');

    expect(profile.links.map((link) => link.url)).toEqual(
      seed.links.create.map((link) => link.url),
    );
  });

  it('lists experience from the newest position to the oldest', async () => {
    const profile = await getProfile('experience { startDate endDate }');
    const startDates = profile.experience.map((item) => item.startDate);

    expect(startDates).toHaveLength(seed.experience.create.length);
    expect(startDates).toEqual([...startDates].sort().reverse());
    expect(profile.experience[0].endDate).toBeNull();
  });

  it('queries only the relations the client asks for', async () => {
    const findSkills = vi.spyOn(app.get(SkillsService), 'findByProfileId');
    const findExperience = vi.spyOn(
      app.get(ExperienceService),
      'findByProfileId',
    );
    const findProjects = vi.spyOn(app.get(ProjectsService), 'findByProfileId');

    await getProfile('name');

    expect(findSkills).not.toHaveBeenCalled();
    expect(findExperience).not.toHaveBeenCalled();
    expect(findProjects).not.toHaveBeenCalled();

    await getProfile('skills { name }');

    expect(findSkills).toHaveBeenCalledOnce();
  });

  it('keeps a single copy of the data when the seed runs again', async () => {
    runSeed();

    const prisma = app.get(PrismaService);
    expect(await prisma.profile.count()).toBe(1);
    expect(await prisma.link.count()).toBe(seed.links.create.length);
    expect(await prisma.skill.count()).toBe(seed.skills.create.length);
    expect(await prisma.experience.count()).toBe(seed.experience.create.length);
    expect(await prisma.project.count()).toBe(seed.projects.create.length);
  });

  it('responds with NOT_FOUND when there is no profile', async () => {
    await app.get(PrismaService).profile.deleteMany();

    try {
      const { data, errors } = await sendQuery('{ profile { name } }');

      expect(data).toBeNull();
      expect(errors?.[0]?.extensions?.code).toBe('NOT_FOUND');
    } finally {
      runSeed();
    }
  });
});
