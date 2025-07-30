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
