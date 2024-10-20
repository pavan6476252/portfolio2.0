
FROM node:20-alpine AS build

WORKDIR /app

COPY ./apps/project1 .

RUN npm install && npm run build
 
FROM node:20-alpine

COPY --from=build /app/dist /app

CMD ["node", "/app/main.js"]
