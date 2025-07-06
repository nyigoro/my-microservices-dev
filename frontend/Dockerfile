# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build # This creates the 'build' folder with static assets

# Stage 2: Serve the built React application using Nginx
FROM nginx:alpine # Use Nginx for serving static files

# Copy ONLY the built static assets from the builder stage into Nginx's web root
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the default Nginx HTTP port
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]