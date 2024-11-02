
FROM node:18-alpine AS build
 
WORKDIR /app
 
COPY ../../package*.json ./
 
RUN npm install
 
COPY . .
 
RUN npx nx run build website
 
FROM nginx:alpine
 
COPY --from=build /app/dist/apps/website /usr/share/nginx/html
 
EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]
