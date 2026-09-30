import { Module } from '@nestjs/common';
import { ExperienceModule } from '../experience/experience.module.js';
import { ProjectsModule } from '../projects/projects.module.js';
import { SkillsModule } from '../skills/skills.module.js';
import { ProfileResolver } from './profile.resolver.js';
import { ProfileService } from './profile.service.js';

@Module({
  imports: [SkillsModule, ExperienceModule, ProjectsModule],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
