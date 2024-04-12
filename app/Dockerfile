ARG BASE_IMAGE=node:20-bookworm-slim
FROM ${BASE_IMAGE} as base

RUN corepack enable

# We tried to make the Dockerfile as lean as possible. In some cases, that means we excluded a dependency your project needs.
# By far the most common is Python. If you're running into build errors because `python3` isn't available,
# uncomment the line below here and in other stages as necessary:
RUN apt-get update && apt-get install -y \
    openssl \
    # python3 make gcc \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app

# Required for building the api and web distributions
ENV NODE_ENV development

FROM base as dependencies

COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml
COPY package.json package.json
COPY web/package.json web/package.json
COPY api/package.json api/package.json
COPY yarn.lock yarn.lock

RUN --mount=type=cache,target=/root/.yarn/berry/cache \
    --mount=type=cache,target=/root/.cache yarn install --immutable

COPY redwood.toml .
COPY graphql.config.js .

FROM dependencies as web_build

ARG POSTHOG_API_KEY

COPY web web
RUN --mount=type=secret,id=POSTHOG_API_KEY \
    POSTHOG_API_KEY="$(cat /run/secrets/POSTHOG_API_KEY)" yarn rw build web

FROM dependencies as api_build

COPY api api
RUN yarn rw build api

FROM dependencies

ENV NODE_ENV production

COPY --from=web_build /app/web/dist /app/web/dist
COPY --from=api_build /app/api /app/api
COPY --from=api_build /app/node_modules/.prisma /app/node_modules/.prisma

COPY .fly .fly

ENTRYPOINT ["sh"]
CMD [".fly/start.sh"]
