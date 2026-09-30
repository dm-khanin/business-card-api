import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findProfile() {
    return this.prisma.profile.findFirst({ orderBy: { id: 'asc' } });
  }

  findLinks(profileId: number) {
    return this.prisma.link.findMany({
      where: { profileId },
      orderBy: { id: 'asc' },
    });
  }
}
