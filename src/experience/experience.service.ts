import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  findByProfileId(profileId: number) {
    return this.prisma.experience.findMany({
      where: { profileId },
      orderBy: [{ startDate: 'desc' }, { id: 'asc' }],
    });
  }
}
