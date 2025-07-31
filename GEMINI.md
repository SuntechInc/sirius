# GEMINI - Project Overview

## 🚀 Application Stack

This is a modern, type-safe Vite application built with cutting-edge web technologies for optimal developer experience and performance.

### Core Technologies
- **⚡ Framework:** Vite - Lightning-fast build tool with HMR
- **📘 Language:** TypeScript - Type-safe development
- **🛣️ Routing:** TanStack Router - Type-safe routing with advanced features
- **🎨 Styling:** Tailwind CSS - Utility-first CSS framework
- **🔍 Code Quality:** ESLint - Comprehensive linting and formatting
- **📊 Data Management:** TanStack Query - Powerful data fetching and caching
- **🔐 Authentication:** JWT with `jose` - Secure token-based authentication
- **🏪 State Management:** Zustand - Lightweight state management
- **🧩 UI Framework:** Radix UI + shadcn/ui - Accessible, composable components

## 📁 Project Architecture

### Directory Structure
```
src/
├── pages/          # Route components and page-level logic
├── components/     # Reusable React components
│   └── ui/         # shadcn/ui component library
├── lib/            # Core utilities and configurations
│   ├── api         # API client
│   ├── auth-store  # Auth management using zustand
│   └── utils       # Utilities
├── hooks/          # Custom React hooks
└── types/          # TypeScript type definitions

public/             # Static assets (images, icons, etc.)
```

### Key Features
- **Type Safety:** End-to-end TypeScript coverage
- **Performance:** Optimized builds with Vite's modern bundling
- **Developer Experience:** Hot module replacement, fast refresh
- **Accessibility:** Radix UI primitives ensure WCAG compliance
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Secure Authentication:** JWT-based auth with proper token handling

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, and project metadata |
| `vite.config.ts` | Vite build configuration and plugins |
| `tsconfig.json` | TypeScript compiler options |
| `eslint.config.js` | Code quality and formatting rules |
| `tailwind.config.js` | Tailwind CSS customization |

## 🛠️ Development Workflow

### Available Scripts
```bash
pnpm dev      # Start development server with HMR
pnpm build    # Create optimized production build
pnpm lint     # Run ESLint with auto-fix
pnpm preview  # Preview production build locally
pnpm test     # Run test suite (if configured)
```

### Development Best Practices
- Use TypeScript strict mode for enhanced type safety
- Follow ESLint rules for consistent code style
- Implement proper error boundaries for robust UX
- Leverage TanStack Query for efficient data management
- Use Zustand for minimal, focused state management

## 🧰 MCP Tools Integration

### Context7 MCP
**Purpose:** Real-time documentation fetching
- Fetch updated docs for Tailwind CSS, shadcn/ui, Radix UI, TanStack Query, TanStack Router and others
- Stay current with API changes and new features
- Access comprehensive examples and usage patterns

### Playwright MCP
**Purpose:** Visual testing and validation
- Automated visual regression testing
- Cross-browser compatibility checks
- Real-time UI validation during development
- Screenshot comparison for UI changes

## 🎯 Getting Started

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Configure environment variables

3. **Start Development**
   ```bash
   pnpm dev
   ```

4. **Build for Production**
   ```bash
   pnpm build && pnpm preview
   ```

## 🔧 Additional Considerations

- **Performance Monitoring:** Consider integrating analytics and performance tracking
- **Error Handling:** Implement comprehensive error boundaries and logging
- **Testing:** Add unit tests with Vitest and integration tests with Playwright
- **Deployment:** Configure CI/CD pipeline for automated deployments
- **Security:** Regular dependency updates and security audits

## Feature Patterns

### Architectural Patterns

*   **Feature-Sliced Design:** The code is organized by features (e.g., `branches`), with each feature having its own directory containing all its related files (components, mutations, queries, services, store, and validations). This promotes modularity and separation of concerns.
*   **Atomic Design Principles:** The `components` directory within each feature seems to follow Atomic Design principles, with smaller, reusable components (atoms) being composed into larger components (molecules, organisms).
*   **State Management with Zustand:** The `store` directory indicates the use of Zustand for managing local component state, particularly for controlling dialogs and other UI elements.
*   **Data Fetching with TanStack Query:** The `queries` and `mutations` directories, along with the use of `useQuery` and `useMutation`, demonstrate the use of TanStack Query for data fetching, caching, and synchronization.
*   **Routing with TanStack Router:** The use of `createFileRoute` in the page components indicates that the application uses TanStack Router for type-safe routing.

### Conventions

*   **File Naming:**
    *   Components are named in PascalCase (e.g., `BranchForm.tsx`).
    *   Hooks are named with the `use` prefix (e.g., `useCreateBranch.ts`).
    *   Services and other utility files are named in kebab-case (e.g., `get-branches.ts`).
*   **Directory Structure:**
    *   Feature-specific code is located in a `-features` directory within the page's directory. It's important to use the `-` before the folder name, it's a convention used by TanStack Router to indicate that the folder will not have any page route.
    *   Each feature has a consistent subdirectory structure: `components`, `mutations`, `queries`, `services`, `store`, and `validations`.
*   **Code Style:**
    *   The code consistently uses TypeScript and JSX.
    *   It follows modern JavaScript features, such as arrow functions and destructuring.
    *   The use of `zod` for schema validation is a clear convention.
    *   The `cn` utility from `shadcn/ui` is used for conditional class names.
