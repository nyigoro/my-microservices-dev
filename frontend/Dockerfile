# Use a lightweight Nginx image
FROM nginx:alpine

# Copy our static files to the Nginx default directory
COPY . /usr/share/nginx/html

# Expose port 80 (Nginx default)
EXPOSE 80

# Command to run Nginx (default command of nginx:alpine image)
CMD ["nginx", "-g", "daemon off;"]
