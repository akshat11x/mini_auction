# Multi-stage Dockerfile: build React client, run Node server serving API + static frontend

# ---- Client build stage ----
FROM node:18-alpine AS client-build
WORKDIR /app

# Install client deps and build
COPY client/package*.json ./client/
RUN npm ci --prefix client || npm install --prefix client
COPY client ./client
RUN npm run build --prefix client

# ---- Server runtime stage ----
FROM node:18-alpine AS server
WORKDIR /app

# Install server deps
COPY server/package*.json ./server/
RUN npm ci --prefix server || npm install --prefix server

# Copy server source
COPY server ./server

# Copy built client into server/build (to be served by Express)
COPY --from=client-build /app/client/build ./server/build

ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /app/server

# Render injects PORT; expose default for local runs
EXPOSE 4000

CMD ["node", "src/app.js"]
