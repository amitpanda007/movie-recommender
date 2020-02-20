### STAGE 1: Build ###
FROM node:12.7-alpine AS node-build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=node-build /usr/src/app/dist/movie-recommender /usr/share/nginx/html