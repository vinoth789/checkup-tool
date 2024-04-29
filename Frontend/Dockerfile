# Stage 1: Build the Angular application
FROM node:12 as build-stage
WORKDIR /app

COPY package*.json ./

# Clear npm cache
RUN npm cache clean --force

# Install dependencies
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine
COPY --from=build-stage /app/dist/maturity-evaluation-tool /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
