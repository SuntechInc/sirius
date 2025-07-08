# Project Overview

This is a Next.js application built with TypeScript. It uses Tailwind CSS for styling and Biome for linting and formatting. Authentication is handled using `iron-session`.

## Key Technologies

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linting/Formatting:** Biome
- **Authentication:** `iron-session`
- **UI Components:** Radix UI, shadcn/ui

## Project Structure

- `src/app`: Contains the main application logic, with routes organized in subdirectories.
  - `(auth)`: Authentication-related pages (login).
  - `(private)`: Pages that require authentication.
  - `(public)`: Publicly accessible pages.
  - `api`: API routes.
- `src/components`: Reusable React components.
  - `ui`: shadcn/ui components.
- `src/lib`: Core application logic, including API clients, session management, and validation schemas.
- `src/hooks`: Custom React hooks.
- `src/types`: TypeScript type definitions.
- `public`: Static assets, such as images.

## Important Files

- `package.json`: Defines project dependencies and scripts.
- `next.config.ts`: Next.js configuration. Note the `output: 'standalone'` setting.
- `tsconfig.json`: TypeScript configuration.
- `biome.json`: Biome configuration.
- `middleware.ts`: Next.js middleware for handling authentication and routing.

## Development Scripts

- `pnpm dev`: Starts the development server with Turbopack.
- `pnpm build`: Creates a production build.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Checks for and fixes linting errors with Biome.

## MCP Tools

- **Context7 MCP** - Use to fetch updated documentation for libraries and frameworks like Next.js, Tailwind CSS, Shadcn and Radix-UI
- **Playwright MCP** - Use to check visual changes in the frontend with a real browser when UI modifications are made
