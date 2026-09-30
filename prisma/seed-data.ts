import type { Prisma } from '../src/generated/prisma/client.js';

const skills: Record<string, string[]> = {
  Backend: ['TypeScript', 'Node.js', 'NestJS', 'Fastify', 'Express'],
  Frontend: [
    'React',
    'Next.js',
    'React Native',
    'Redux',
    'Ember.js',
    'Tailwind',
  ],
  Data: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  AWS: ['Lambda', 'SQS/SNS', 'S3', 'Kinesis', 'ECS', 'CloudWatch'],
  Architecture: [
    'DDD',
    'CQRS',
    'Event-Driven',
    'Microservices',
    'Change Data Capture',
  ],
  Reliability: ['Idempotency', 'Retries', 'Timeouts', 'Graceful degradation'],
  DevOps: ['Terraform', 'Docker', 'GitHub Actions'],
  Testing: ['Jest', 'Mocha/Chai', 'Sinon', 'nyc/Istanbul'],
  AI: ['Anthropic Claude SDK', 'OpenAI API', 'Google GenAI'],
  Observability: ['Elastic APM', 'OpenTelemetry', 'Sentry'],
};

export const profile = {
  name: 'Dmitrii Khanin',
  title: 'Senior Backend Node.js Engineer',
  description:
    'Senior Backend Engineer with 9+ years of production experience building high-integrity systems ' +
    'where correctness and reliability matter. Owned the platform migration to DDD/CQRS at Syncle and ' +
    'apply reliability patterns — idempotency, retries, timeouts, graceful degradation — across an ' +
    'event-driven AWS pipeline. Grew a team from 5 to 20 engineers and taught 500+ students at Yandex.Practicum.',
  links: {
    create: [
      { label: 'Website', url: 'https://khanin.dev' },
      { label: 'GitHub', url: 'https://github.com/dm-khanin' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/dm-khanin' },
      { label: 'Email', url: 'mailto:me@khanin.dev' },
    ],
  },
  skills: {
    create: Object.entries(skills).flatMap(([category, names]) =>
      names.map((name) => ({ name, category })),
    ),
  },
  experience: {
    create: [
      {
        company: 'Syncle (formerly Videoly)',
        position: 'Backend Node.js Engineer',
        startDate: new Date('2020-12-01'),
        endDate: null,
        achievements: [
          'Migrated the legacy monolith to a DDD/CQRS architecture — 6+ bounded contexts, 138 use-cases, event-driven communication',
          'Built the Content Library from zero (NestJS + Fastify, JSON:API v1.0, Zod-validated contracts) — the canonical content catalog behind every retailer-facing service',
          'Designed 9 AWS Lambda microservices (SQS FIFO + Terraform) for an auto-linking pipeline, with idempotency keys, retry policies and dead-letter queues for safe at-least-once delivery',
          'Fixed production-critical memory leaks in replication daemons (RxJS → native streams) and optimized SQL with CTE-based upserts',
          'Led MongoDB → PostgreSQL migrations across 6 services with zero downtime; authored 200+ migrations across 3 PostgreSQL databases',
          'Integrated Anthropic Claude, OpenAI GPT and Google GenAI for automated product mapping; built vector search via Qdrant',
          'Maintained 250+ Jest test files under strict TypeScript with a zero-tolerance silent-error policy',
        ],
      },
      {
        company: 'IT-company LAD',
        position: 'Backend Developer → Technical Leader',
        startDate: new Date('2018-04-01'),
        endDate: new Date('2020-11-01'),
        achievements: [
          'Grew from backend engineer to technical leader of a 20-person cross-functional team in under 2 years; hired and onboarded 10+ junior developers',
          'Led a React/Next.js storefront and a React Native POS app alongside Node.js microservices for 800+ retail stores',
          'Integrated payment, logistics and inventory providers under strict uptime SLAs, with retries and idempotency for transactional flows',
          'Introduced TypeScript, Docker and CI/CD (GitLab) to a team that had none; established code review and a release process',
        ],
      },
      {
        company: 'IT-company LAD',
        position: 'Fullstack Developer',
        startDate: new Date('2017-02-01'),
        endDate: new Date('2018-04-01'),
        achievements: [
          'Built the Evotor POS terminal product full-stack: React + Redux web client, Node.js backend, Android (Java/Kotlin)',
        ],
      },
      {
        company: 'Practicum by Yandex',
        position: 'Student Mentor',
        startDate: new Date('2019-11-01'),
        endDate: new Date('2023-04-01'),
        achievements: [
          'Mentored 500+ students across 6+ cohorts in full-stack web development through code-review feedback and pair programming',
          'Ran live coding sessions with 70%+ participation, well above the platform average',
          'Built teaching materials and diagnostic exercises that helped identify struggling students early',
        ],
      },
      {
        company: 'State University of Nizhni Novgorod (UNN)',
        position: 'Web Development Lecturer',
        startDate: new Date('2018-04-01'),
        endDate: new Date('2020-07-01'),
        achievements: [
          'Designed and delivered a full JavaScript course (ES6 → React/Redux → Node.js) from scratch with a 95% completion rate; 50+ lectures, 100+ students mentored',
        ],
      },
    ],
  },
  projects: {
    create: [
      {
        name: 'Business Card API',
        description:
          'This service: a GraphQL business card built with NestJS, Prisma and PostgreSQL.',
        url: 'https://github.com/dm-khanin/business-card-api',
      },
      {
        name: 'khanin.dev',
        description:
          'Personal website with an interactive terminal, built with React, Vite and Tailwind CSS.',
        url: 'https://khanin.dev',
      },
      {
        name: 'Trade Invest Bot',
        description:
          'Telegram bot backend for trading and investment features, built with NestJS and Telegraf.',
        url: 'https://github.com/dm-khanin/trade-invest-bot-backend',
      },
      {
        name: 'Yandex.Practicum webinar demos',
        description:
          'Live-coding projects from webinars I ran as a mentor: JavaScript, React, Redux, MobX, Node.js, Docker.',
        url: 'https://github.com/dm-khanin?tab=repositories&q=practicum-demo',
      },
    ],
  },
} satisfies Prisma.ProfileCreateInput;
