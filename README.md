# Fyn - Frontend

## Stack

- [Sveltekit](https://svelte.dev/docs/kit/introduction)
- [Tailwindcss](https://tailwindcss.com/docs/)

## API

We use the [Fyn API](https://github.com/Fyn-JobBoard/api) as the primary backend.

To make interactions with the API easier, we use the [Fyn Api SDK](https://github.com/Fyn-JobBoard/sdk).

### Authentification

Because the API requires authentification, we use with the api some [helper auth methods](./src/lib/server/api/api.ts) to quickly send request as `guest` or `authentified` person.
You can also use the `from_cookies` method to automatically chose between this 2 kind of request authentification based on request's cookies.

## Usage

### Setup

Before launching the application, you must setup environnement variables as defined in the [`.env.example` file](./.env.example).

```bash
mv .env{.example,}

# Then you'll need to edit the .env file
```

### Node/Bun

```bash
bun install

bun dev --open
```

```bash
npm install

npm run dev --open
```

### Docker

```bash
docker compose -f compose.dev.yml up --env-file .env
```

## Build/production

### Build and deploy with Node/Bun

```bash
# Use the GCP_BUILDPACKS to "1" to force the adapter-auto package to use adapter-node
GCP_BUILDPACKS=1 bun run build

bun build/index.js
```

### Build and deploy with Docker

```bash
docker compose up --env-file .env
```
