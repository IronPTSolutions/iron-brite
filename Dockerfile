# build web
FROM node:18.19.0 as builder

ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL=$VITE_BASE_API_URL

WORKDIR /app

COPY ./web/package.json /app
COPY ./web/package-lock.json /app

RUN npm install

COPY ./web /app

RUN npm run build

# build api
FROM node:18.19.0

WORKDIR /app

COPY ./api/package.json /app
COPY ./api/package-lock.json /app

RUN npm install

COPY ./api /app

# copy web into api
COPY --from=builder /app/dist /app/public

EXPOSE 3000

CMD ["npm", "start"]
