FROM docker.io/node:21-alpine AS builder

RUN npm install --global pnpm

COPY . /app

RUN cd ./app && pnpm install
RUN cd ./app && pnpm build

FROM docker.io/node:21-alpine

COPY --from=builder /app/.output/ /app

LABEL org.opencontainers.image.authors "Gaspard Wierzbinski (https://cpluspatch.com)"
LABEL org.opencontainers.image.source "https://github.com/CPlusPatch/web-landing"
LABEL org.opencontainers.image.vendor "CPlusPatch"
LABEL org.opencontainers.image.licenses "GPL-3.0"
LABEL org.opencontainers.image.title "Web Landing"
LABEL org.opencontainers.image.description "Landing page for my website"

CMD ["cd", "/app/server", "&&", "node", "index.mjs"]
