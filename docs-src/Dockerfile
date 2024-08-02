# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Astro"

# Astro app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install pnpm
ARG PNPM_VERSION=9.2.0
RUN npm install -g pnpm@$PNPM_VERSION


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy library code
COPY --link ./shepherd.js ./shepherd.js

# Copy application code
COPY --link ./docs-src ./docs-src
RUN pnpm install --frozen-lockfile --prod=false

# Build application
RUN pnpm -F shepherd-docs run build

# Remove development dependencies
RUN pnpm prune --prod


# Final stage for app image
FROM nginx

# Copy built application
COPY --from=build /app/docs-src/dist /usr/share/nginx/html

# Start the server by default, this can be overwritten at runtime
EXPOSE 80
CMD [ "/usr/sbin/nginx", "-g", "daemon off;" ]
