FROM node:15.13.0-alpine3.13 AS front-end-build

WORKDIR /app/front-end

COPY front-end/package.json /app/front-end
COPY front-end/yarn.lock /app/front-end
RUN yarn install

COPY front-end/ /app/front-end

RUN npm run build

FROM node:15.13.0-alpine3.13 AS back-end-build

WORKDIR /app/api

COPY api/package.json /app/api
COPY api/package-lock.json /app/api
RUN npm install

COPY api/ /app/api

COPY --from=front-end-build /app/front-end/build /app/api/public/

ENTRYPOINT ["node", "/app/api/index.js"]