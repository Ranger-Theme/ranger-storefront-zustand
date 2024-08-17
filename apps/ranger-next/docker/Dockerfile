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
RUN pnpm install pm2 --global

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
RUN chmod -R 777 /usr/app/pm2/

# Show current folder structure in logs
WORKDIR /usr/app

CMD ["pm2-runtime", "start", "pnpm", "--", "start"]
