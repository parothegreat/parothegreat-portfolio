# Server Deployment Instructions

This document is the implementation contract for Codex working on the
production server. The final operator workflow must be:

```bash
portfolio-update
```

Do not implement the command until the server discovery checklist below is
complete. Record the discovered values in server-local configuration, never in
this repository.

## Deployment Goal

Deploy the `main` branch of this repository to `https://parothegreat.site`
without exposing secrets, interrupting the running release during a build, or
leaving the site offline after a failed update.

Use Node.js 20 and Yarn 1.22.22, as pinned by `package.json`.

## Discover First

Confirm all of these on the server:

- Linux distribution and available package manager
- Non-root service account that owns the application files
- Repository URL and expected GitHub organization/user
- Existing application path, systemd unit, port, and health URL
- Nginx configuration and TLS termination
- Node.js 20 and Corepack/Yarn availability
- Available disk space and memory
- Location and permissions of the production `.env`
- Current database provider, backup method, and whether a schema change exists

Stop and report any mismatch. Do not guess paths, service names, ports, users,
or database actions.

## Required Layout

Prefer an atomic release layout:

```text
/srv/parothegreat-portfolio/
├── repo.git/
├── releases/
│   └── <git-sha>/
├── shared/
│   └── .env
├── current -> releases/<git-sha>
└── deploy.lock
```

The exact base path may change after discovery. Keep `.env` outside Git, owned
by the service account, and set its mode to `600`.

## `portfolio-update` Contract

The command must:

1. Exit on errors and unset variables, use a restrictive umask, and never
   enable shell tracing around secrets.
2. Acquire an exclusive `flock` so two deployments cannot run together.
3. Verify the Git remote and fetch `origin/main` with a read-only deploy key.
4. Resolve the fetched commit SHA and create a new, empty release directory.
5. Check out that exact SHA into the new release without modifying the active
   release.
6. Link the server-owned `.env` into the release without printing its values.
7. Run `yarn install --frozen-lockfile`, then lint, type-check, tests, and the
   production build.
8. Switch `current` atomically only after every check succeeds.
9. Restart the existing systemd service and wait for its local health check.
10. Verify the public HTTPS URL through Nginx.
11. On restart or health-check failure, restore the previous `current` target,
    restart the service, verify recovery, and exit non-zero.
12. Keep the current release plus at least three successful older releases,
    then remove only older inactive releases.
13. Log the start time, old SHA, new SHA, result, and rollback result without
    logging credentials.

The command should also support:

```bash
portfolio-update --dry-run
portfolio-update --rollback
portfolio-update --status
```

These options belong to the same command; do not create separate update
scripts.

## Service Requirements

- Run Next.js as the non-root service account.
- Bind the application to localhost; expose it publicly only through Nginx.
- Let systemd restart the process and capture stdout/stderr in journald.
- Use a narrow sudoers rule only if the deploy account must restart the single
  portfolio service.
- Keep the systemd unit and Nginx configuration backed up before changing them.
- Do not install PM2, Docker, or another process manager unless the existing
  server already requires it.

## Database Safety

The current project uses Prisma with PostgreSQL for Projects. Firebase has been
removed and stores no portfolio data.

Do not run database migrations automatically in `portfolio-update`. When a
schema change is present:

1. Back up the production database.
2. Review the migration separately.
3. Apply it through an explicit, logged maintenance command.
4. Verify the application before making the migration part of automation.

Moving Projects to MongoDB is a separate migration project. Do not change the
Prisma provider or production connection string during routine deployment.

## Forbidden Operations

Do not use any of these in the deployment path:

- `git pull` inside the live release
- `git reset --hard` or `git clean -fdx` on the active release
- Builds inside the active `current` directory
- Force-pushing or writing to the Git remote
- Personal GitHub tokens when a read-only deploy key is sufficient
- Secrets in command arguments, Git, logs, or generated client bundles
- `prisma migrate reset`, destructive SQL, or automatic database conversion
- Deleting the previous release before the new release passes health checks

## Acceptance Checks

Before handing over `portfolio-update`, demonstrate:

1. A normal update from one commit to the next.
2. A no-op update when the same SHA is already active.
3. A build failure that leaves the old release online.
4. A failed health check that triggers automatic rollback.
5. Concurrent execution where the second process exits because of the lock.
6. `--dry-run`, `--status`, and `--rollback`.
7. HTTP 200 from localhost and `https://parothegreat.site`.
8. No secret values in command output, journald, or release metadata.

Report the final paths, service name, port, active SHA, previous SHA, and exact
rollback command after verification.
