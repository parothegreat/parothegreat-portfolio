# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 Pages Router application written primarily in TypeScript. Page routes and API handlers live in `src/pages/` and `src/pages/api/`. Feature UI is grouped under `src/modules/` (`home`, `projects`, `dashboard`, `contact`, and `about`), while shared components, hooks, contexts, types, constants, and styles belong in `src/common/`. Keep external integration logic in `src/services/`. Tests live in `src/__tests__/`, static files in `public/`, and database schema and migrations in `prisma/`.

## Build, Test, and Development Commands

Use Node.js 20 and Yarn 1, matching CI and `yarn.lock`.

- `yarn install` installs dependencies and generates the Prisma client.
- `yarn dev` starts the local site at `http://localhost:3000`.
- `yarn build` creates a production build and generates sitemap files.
- `yarn lint` runs the Next.js ESLint checks.
- `yarn typecheck` checks TypeScript without emitting files.
- `yarn format:check` verifies Prettier formatting; `yarn format` fixes it.
- `yarn test` runs Jest once; `yarn test:watch` supports local iteration.

Before opening a PR, run `yarn lint && yarn typecheck && yarn format:check && yarn test`.

## Coding Style & Naming Conventions

Prettier enforces two-space indentation, single quotes, semicolons, and Tailwind class sorting. ESLint checks Next.js, TypeScript, import ordering, and unused imports. Name React components and their files in PascalCase (`ProjectCard.tsx`), hooks with `use` (`useIsMobile.ts`), and route files after their URL, including dynamic segments such as `[slug].tsx`. Prefer the `@/` alias for imports from `src/`.

## Testing Guidelines

Jest runs in `jsdom` with React Testing Library and `jest-dom`. Name tests `*.test.ts` or `*.test.tsx` and place them under `src/__tests__/` in a path that mirrors the code. Test observable behavior rather than implementation details. No coverage threshold is configured; add focused regression tests for changed behavior.

## Commit & Pull Request Guidelines

Husky and commitlint require Conventional Commit types such as `feat:`, `fix:`, `docs:`, `refactor:`, and `test:`. Use a short imperative summary, for example `fix: align project cards on mobile`; older bracketed messages in history are not the current enforced format.

Follow `.github/pull_request_template.md`: explain the change, link related issues (`Fixes #123`), list proposed changes, confirm checks passed, and include screenshots or GIFs for visual updates. Keep each PR focused.

## Security & Configuration

Copy `.env.example` to `.env` and provide only the integrations needed locally. Never commit credentials or personal tokens. Review Prisma migrations before applying or submitting them.
