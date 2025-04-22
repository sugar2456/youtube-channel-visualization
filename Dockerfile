FROM node:23-slim AS development

WORKDIR /app

RUN chown -R node:node /app
USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm install

COPY --chown=node:node . .

RUN npm run build

# 本番環境ステージ
FROM node:23-slim AS production

WORKDIR /app

RUN chown -R node:node /app
USER node

COPY --from=development /app/package.json /app/package-lock.json ./
RUN npm ci --only=production

COPY --from=development /app/next.config.ts ./
COPY --from=development /app/.next ./.next
COPY --from=development /app/public ./public

CMD ["npm", "start"]