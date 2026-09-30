import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { profile } from './seed-data.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

await prisma.$transaction([
  prisma.profile.deleteMany(),
  prisma.profile.create({ data: profile }),
]);
await prisma.$disconnect();

console.log(`Seeded profile: ${profile.name}`);
