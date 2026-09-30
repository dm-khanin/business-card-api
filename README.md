# Business Card API

GraphQL API with my profile, skills, work experience and projects.

Live: _link after deployment_ (free Render instance, so the first request after a pause can take up to a minute)

Stack: TypeScript, NestJS, Apollo Server, Prisma, PostgreSQL, Docker.

## Run

```bash
docker compose up --build
```

Apollo Sandbox: http://localhost:3000/graphql

```graphql
query {
  profile {
    name
    description
    links { label url }
    skills { name category }
    experience { company position startDate endDate achievements }
    projects { name description url }
  }
}
```

The app container applies migrations and seeds the database on every start.

## Local development

Node.js 24 is required (see `.nvmrc`).

```bash
cp .env.example .env
docker compose up -d db
npm ci
npm run db:setup
npm run start:dev
```

## Tests

```bash
npm test
npm run test:e2e   # needs the database running
```

## Notes

- Nested lists (`links`, `skills`, `experience`, `projects`) are resolved by field resolvers, so a
  query only hits the tables it asks for. They all belong to a single profile, so there is no N+1
  and no need for DataLoader.
- The seed deletes the profile and creates it again from `prisma/seed-data.ts` in one transaction.
  It is safe to run on every start, and updating the data is just a redeploy.
- Introspection and the Sandbox are enabled in production on purpose: the API is public and read-only.
