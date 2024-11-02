from node:18-alpine  as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx nx build backend

FROM node:20-alpine 

COPY --from=build /app/dist/apps/backend /app

EXPOSE 80

CMD ["node", "/app/main.js"]