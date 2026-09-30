import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findByProfileId(profileId: number) {
    return this.prisma.project.findMany({
      where: { profileId },
      orderBy: { id: 'asc' },
    });
  }
}
