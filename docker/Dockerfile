# Base on offical Node.js image
FROM node:18-alpine

# Pnpm with docker
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN npm install pm2 --global

# Copy files to docker
COPY ./ ./

# Install dependencies
RUN pnpm install --production --frozen-lockfile

# Build app
RUN pnpm build

# Expose the listening port
EXPOSE 3000

WORKDIR /usr/app
RUN mkdir /usr/app/pm2
RUN mkdir /usr/app/pm2/logs

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD pnpm run deploy
