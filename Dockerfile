# ---------- base ----------
FROM node:22-alpine AS base
RUN apk add --no-cache \
  && npm cache clean --force
WORKDIR /app
COPY package*.json ./

# ---------- dev (hot reload) ----------
FROM base AS dev
RUN npm install
# Copy only config for Nest CLI/TS so start:dev can run even before source is mounted
COPY nest-cli.json tsconfig*.json ./
# (we'll mount ./src from the host at runtime)
ENV CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true \
    NODE_ENV=development
CMD ["npm","run","start:dev"]