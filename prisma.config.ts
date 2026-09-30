import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // not env(): it throws when DATABASE_URL is unset, e.g. during docker build
    url: process.env.DATABASE_URL,
  },
});
