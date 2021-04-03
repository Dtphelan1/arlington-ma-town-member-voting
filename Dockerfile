FROM node:15.13.0-alpine3.13

WORKDIR /app/api

COPY api/package.json /app/api
COPY api/package-lock.json /app/api
RUN npm install

COPY api/ /app/api

ENTRYPOINT ["node", "/app/api/index.js"]