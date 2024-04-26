# Stage 1 - build-stage
FROM node:21-alpine3.19 AS build-stage

WORKDIR /frontend
COPY package*.json .
RUN npm install 
COPY . .
RUN npm run build

# Stage 2 - prod-stage
FROM nginx:1.25-alpine AS prod-stage

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /frontend/dist .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]