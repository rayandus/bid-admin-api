#!/bin/bash

# Download and install NVM if it's not already installed
if ! command -v nvm &> /dev/null
then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Install and use the latest version of Node.js
nvm install
nvm use

# Install pnpm globally
npm install -g pnpm

# Install project dependencies and build the project
pnpm install
pnpm run build
