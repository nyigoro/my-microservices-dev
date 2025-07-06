# --- Build Stage ---
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

# --- Production Stage ---
FROM node:18-alpine

# Set environment variables (these can be overridden by Docker Compose)
ENV NODE_ENV=production \
    PORT=8080

# Create a non-root user and group for security
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /usr/src/app

# Copy only necessary files from the build stage (node_modules)
COPY --from=builder /app/node_modules ./node_modules
# Copy the application code (excluding files in .dockerignore)
COPY . .

# Set the user to the non-root user
USER appuser

# Expose the application port
EXPOSE ${PORT}

# Command to run the application
CMD ["node", "app.js"]
