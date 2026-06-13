# Fyn - Frontend

> Frontend application for the Fyn Job Board platform - Connecting students with apprenticeship opportunities

[![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/docs/kit/introduction)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/docs/)
[![Bun](https://img.shields.io/badge/Bun-FF6B35?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Description

Fyn Frontend is a SvelteKit application designed for students seeking apprenticeship opportunities. It provides a modern, responsive interface for:

- Browsing and searching job offers
- Managing applications and candidate profiles
- Accessing resources and guides about apprenticeship
- User authentication and authorization

The application consumes the [Fyn API](https://github.com/Fyn-JobBoard/api) through the official [Fyn API SDK](https://github.com/Fyn-JobBoard/sdk).

---

## Tech Stack

### Core Framework

- **[SvelteKit](https://svelte.dev/docs/kit/introduction)** - Full-stack framework with file-based routing
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety throughout the application

### Styling

- **[Tailwind CSS v4](https://tailwindcss.com/docs/)** - Utility-first CSS framework
- **[@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)** - Form styling utilities
- **[@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)** - Typography utilities

### Build Tools

- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[Bun](https://bun.sh/)** - JavaScript runtime (alternative to Node.js)
- **[@sveltejs/adapter-node](https://svelte.dev/docs/kit/adapters#adapter-node)** - Node.js server adapter

### Dependencies

- **[fyn-api-sdk](https://github.com/Fyn-JobBoard/sdk)** (v0.1.3) - Official SDK for Fyn API interactions

---

## Project Structure

```
front-students/
├── src/
│   ├── lib/
│   │   ├── assets/           # Static assets (logos, icons, favicon)
│   │   ├── components/       # Reusable UI components
│   │   │   ├── cards/        # Card components (article, job, etc.)
│   │   │   ├── forms/        # Form components (inputs, selects, etc.)
│   │   │   ├── ui/           # Basic UI components (button, tag, etc.)
│   │   │   ├── Profile/      # Profile-related components
│   │   │   ├── heros/        # Hero section components
│   │   │   ├── jobs/         # Job-related components
│   │   │   ├── kanban/       # Kanban board components
│   │   │   └── resolvers/    # Data resolvers (city, etc.)
│   │   ├── data/             # Static data (articles, reviews)
│   │   ├── server/
│   │   │   └── api/          # API client helpers & authentication
│   │   │       └── api.ts    # FynFetchClients & useApi utility
│   │   └── styles/           # CSS styles & theme
│   │       ├── app.css       # Main application styles
│   │       └── theme/         # Design tokens & theme
│   └── routes/               # Application routes (file-based routing)
│       ├── (auth)/           # Auth group (login, register, logout)
│       ├── (homepage)/       # Homepage group
│       ├── applications/     # Applications management
│       ├── contact/          # Contact page
│       ├── jobs/             # Job listings
│       ├── legals/           # Legal pages
│       ├── resources/        # Resources section
│       └── +layout.svelte    # Root layout
└── static/                   # Static files (images, etc.)
```

---

## Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- **npm** or **bun** package manager
- **Docker** (optional, for containerized development)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Fyn-JobBoard/front-students.git
cd front-students
```

### 2. Install dependencies

**With Bun (recommended):**

```bash
bun install
```

**With npm:**

```bash
npm install
```

---

## Configuration

### Environment Variables

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

| Variable          | Description                          | Required                     |
| ----------------- | ------------------------------------ | ---------------------------- |
| `API_ENDPOINT`    | Base URL of the Fyn API              | Yes                          |
| `API_TOKEN`       | Bearer token for API authentication  | Yes                          |
| `GEOAPIFY_TOKEN`  | Token for Geoapify geocoding service | No                           |
| `APP_AUTH_COOKIE` | Name of the authentication cookie    | Yes (default: `fyn-session`) |

### Default Values

```env
API_ENDPOINT=https://api.fyn.dev
API_TOKEN=
GEOAPIFY_TOKEN=
APP_AUTH_COOKIE=fyn-session
```

---

## Development

### Local Development with Bun/Node

**Start the development server:**

```bash
# With Bun
bun dev --open

# With npm
npm run dev --open
```

The application will be available at `http://localhost:5173`

### Hot Reload

The development server supports hot module replacement (HMR). Changes to Svelte components and styles will be reflected immediately without page reload.

### Docker Development

**Start the development container:**

```bash
docker compose -f compose.dev.yml up
```

This will:

- Build the development image
- Mount `./src` and `./static` as volumes
- Expose port `5173`
- Load environment variables from `.env`

The application will be available at `http://localhost:5173`

> **Note:** Docker environment uses Bun as the runtime.

---

## Build & Deployment

### Build for Production

**With Bun (recommended):**

```bash
# Force adapter-auto to use adapter-node
GCP_BUILDPACKS=1 bun run build

# Run the built application
bun run build/index.js
```

**With npm:**

```bash
npm run build
node build/index.js
```

The production build outputs to the `build/` directory.

### Docker Production

**Build and run with Docker Compose:**

```bash
docker compose up
```

This will:

- Build the production image
- Run the application on port `3000`
- Load environment variables from `.env`

**Or manually:**

```bash
# Build the image
docker build -t fyn-frontend .

# Run the container
docker run -p 3000:3000 --env-file .env fyn-frontend
```

The application will be available at `http://localhost:3000`

---

## API Integration

### Fyn API SDK

The application uses the official [Fyn API SDK](https://github.com/Fyn-JobBoard/sdk) for all API interactions. The SDK is configured with the `API_ENDPOINT` environment variable.

### Authentication Helpers

The project provides utility methods in [`src/lib/server/api/api.ts`](src/lib/server/api/api.ts) to simplify API authentication:

#### `FynFetchClients` Class

Three main authentication methods are available:

```typescript
import { FynFetchClients } from '$lib/server/api/api';

// 1. Authenticated requests using cookies
const fetcher = FynFetchClients.from_cookies(cookies, fetch);

// 2. Requests as guest (using API_TOKEN from .env)
const fetcher = FynFetchClients.guest();

// 3. Custom authenticated requests
const fetcher = FynFetchClients.auth({ bearer: 'your-token' });
const fetcher = FynFetchClients.auth({ email: 'example@domain.com', password: 'Azerty-1234' });
```

#### `useApi` Utility

A helper function to instantiate API clients with the correct fetch implementation:

```typescript
import { useApi } from '$lib/server/api/api';
import { SomeApi } from 'fyn-api-sdk';

const api = useApi(SomeApi, fetcher);
```

### Authentication Flow

- **Guest requests**: Use the `API_TOKEN` from environment variables
- **User requests**: Use JWT stored in cookies (`APP_AUTH_COOKIE`)
- **Auto-detection**: Use `from_cookies()` to automatically switch between guest and user authentication

---

## Styling Convention

### Tailwind CSS v4

The project uses Tailwind CSS v4 with the `@tailwindcss/vite` plugin. Styles are defined in:

- `src/lib/styles/app.css` - Main Tailwind CSS file
- `src/lib/styles/theme/` - Design tokens and theme configuration

---

## Contributing

### Code Style

The project uses **Prettier** for code formatting:

- Configuration: `.prettierrc`
- Ignore patterns: `.prettierignore`

**Format your code before committing:**

```bash
bun run format
# or
npm run format
```

### Type Checking

Run type checking with SvelteKit and TypeScript:

```bash
bun run check
# or
npm run check
```

### Git Workflow

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Run linting and type checking
4. Commit your changes
5. Push to the branch: `git push origin feat/your-feature`
6. Open a Pull Request

---

## License

This project is private and part of the Fyn Job Board platform. For licensing information, refer to the main [Fyn organization](https://github.com/Fyn-JobBoard) policies.
