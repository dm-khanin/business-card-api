import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { Experience } from '../experience/experience.model.js';
import { ExperienceService } from '../experience/experience.service.js';
import { Project } from '../projects/project.model.js';
import { ProjectsService } from '../projects/projects.service.js';
import { Skill } from '../skills/skill.model.js';
import { SkillsService } from '../skills/skills.service.js';
import { Link } from './link.model.js';
import { Profile } from './profile.model.js';
import { ProfileService } from './profile.service.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly skillsService: SkillsService,
    private readonly experienceService: ExperienceService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Query(() => Profile)
  async profile() {
    const profile = await this.profileService.findProfile();
    if (!profile) {
      throw new GraphQLError('Profile not found', {
        extensions: { code: 'NOT_FOUND' },
      });
    }
    return profile;
  }

  @ResolveField(() => [Link])
  links(@Parent() profile: Profile) {
    return this.profileService.findLinks(profile.id);
  }

  @ResolveField(() => [Skill])
  skills(@Parent() profile: Profile) {
    return this.skillsService.findByProfileId(profile.id);
  }

  @ResolveField(() => [Experience])
  experience(@Parent() profile: Profile) {
    return this.experienceService.findByProfileId(profile.id);
  }

  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile) {
    return this.projectsService.findByProfileId(profile.id);
  }
}
