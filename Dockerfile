FROM node:18.18.0

# Set working directory in the container
WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy from host current directory to the docker working directory
COPY . .

# Run pre-build checks
RUN pnpm lint
RUN pnpm test

# Build the app
RUN pnpm build

# Start command
CMD ["pnpm", "start:prod"]
