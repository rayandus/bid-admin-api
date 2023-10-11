FROM node:18.18.0

# Set working directory in the container
WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

# Install pnpm globally
RUN npm install -g pnpm

# Use pnpm to install dependencies
RUN pnpm install

# Copy from host current directory to the docker working directory
COPY . .

# Use pnpm to build your project
RUN pnpm build

# Start command
CMD ["pnpm", "start:prod"]
