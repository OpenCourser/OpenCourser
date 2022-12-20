FROM node:16-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
RUN yarn global add turbo
WORKDIR /app
COPY . .
RUN turbo prune --scope=@opencourser/web --docker

FROM node:16-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
RUN yarn install --frozen-lockfile


FROM node:16-alpine AS sourcer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build --scope=@opencourser/web --include-dependencies --no-deps

FROM node:16-alpine as runner
WORKDIR /app
COPY --from=sourcer /app/ .
WORKDIR /app/apps/web/
CMD [ "npm", "start" ]