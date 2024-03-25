FROM node:18.18.0-alpine

# Set working directory in the container
WORKDIR /app

# Copy from host current directory to the docker working directory
COPY . .

# Install pnpm globally in the container
RUN command -v pnpm >/dev/null 2>&1 || { npm install -g pnpm; }

# Install dependencies in the container
RUN pnpm install --frozen-lockfile

# Run pre-build checks in the container
RUN pnpm lint
RUN pnpm test

# Build the app
RUN pnpm build

# Prune unnecessary dependencies (remove devDependencies)
RUN pnpm prune --prod

# Start command
CMD ["pnpm", "start:prod"]
