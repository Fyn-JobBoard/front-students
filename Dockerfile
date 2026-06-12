FROM oven/bun:slim AS dev

WORKDIR /app

COPY . .

RUN bun i

EXPOSE 5173

CMD [ "bun", "dev", "--port", "5173", "--host", "0.0.0.0" ]

FROM dev AS build

RUN bun run build --outDir build

FROM oven/bun:slim AS prod

WORKDIR /app

COPY --from=build /app/build .
COPY --from=build /app/package.json ./

RUN bun i --production

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "index.js"]
