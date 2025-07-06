FROM node:18-alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build # Creates 'build' directory

FROM nginx:alpine # Use Nginx for serving static files
COPY --from=builder /app/build /usr/share/nginx/html # ONLY copy the built static assets
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
