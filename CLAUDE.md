# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` (uses Vite)
- **Build for production**: `pnpm build` (TypeScript compilation + Vite build)
- **Lint code**: `pnpm lint` (ESLint)
- **Lint and auto-fix**: `pnpm lint:fix` (ESLint with auto-fix)
- **Format code**: `pnpm format` (Prettier)
- **Check formatting**: `pnpm format:check` (Prettier check without writing)
- **Preview production build**: `pnpm preview`

## Project Architecture

This is a React SPA built with:

- **Vite** as build tool with TypeScript
- **TanStack Router** for file-based routing with type-safe navigation
- **TanStack Query** for server state management
- **Styling** Tailwind CSS with shadcn/ui components
- **React Hook Form + Zod** for form validation
- **Zustand** for client state management
- **JWT authentication** with axios interceptors
- **ESLint + Prettier** for code linting and formatting (with Tailwind CSS class sorting)

### Routing Structure

The app uses TanStack Router with file-based routing in `src/pages/`:

- `/_auth/*` - Unauthenticated routes (login, public pages)
- `/_app/*` - Protected app routes for regular users
- `/_admin/admin/*` - Admin-only routes (GLOBAL_ADMIN role)

Route guards are implemented in layout files:

- `src/pages/_app/layout.tsx` - Redirects unauthenticated users and global admins
- `src/pages/_admin/admin/layout.tsx` - Only allows GLOBAL_ADMIN users

### Feature Organization

Features follow a modular structure under each route:

```
pages/[route]/-features/[feature]/
  ├── components/     # Feature-specific components
  ├── mutations/      # TanStack Query mutations
  ├── queries/        # TanStack Query queries
  ├── services/       # API service functions
  ├── store/          # Zustand stores
  └── validations/    # Zod schemas
```

### Authentication System

- JWT tokens stored in localStorage via `src/lib/storage.ts`
- Auth context in `src/contexts/auth-context.tsx` manages user state
- Axios interceptor in `src/lib/api.ts` adds Bearer tokens automatically
- User types: `GLOBAL_ADMIN` and regular users with company-scoped access

### Key Conventions

- Use absolute imports with `@/` alias for `src/`
- Component files use kebab-case naming
- TypeScript types are defined in `src/types/`
- All API calls go through the configured axios instance in `src/lib/api.ts`
- Forms use React Hook Form with Zod validation
- UI components from `src/components/ui/` using Tailwind CSS with shadcn/ui components
- Code formatting is handled by Prettier (configured in `.prettierrc`)
- ESLint rules include Prettier integration for consistent code style
- Tailwind CSS classes are automatically sorted by Prettier using `prettier-plugin-tailwindcss`
