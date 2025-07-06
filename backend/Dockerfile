# --- Stage 1: Builder Stage ---
# Use a Node.js image to build/install dependencies.
# We name this stage 'builder' so we can reference it later.
FROM node:18-alpine AS builder

# Set the working directory inside this stage's container
WORKDIR /app

# Copy package.json and package-lock.json first.
# This leverages Docker's layer caching: if these files don't change,
# the npm install step won't be re-executed on subsequent builds, speeding them up.
COPY package.json ./
COPY package-lock.json ./ # Include package-lock.json for deterministic builds

# Install only production dependencies.
# This avoids including dev dependencies in the final image.
RUN npm install --omit=dev

# Copy the rest of your application source code
COPY . .

# --- Stage 2: Production Stage ---
# Start a fresh, lean Node.js image for the final production environment.
FROM node:18-alpine

# Set the working directory for the application in the final image
WORKDIR /usr/src/app

# Create a non-root user and group for enhanced security.
# This prevents the application from running as 'root' inside the container.
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy only the necessary artifacts from the 'builder' stage:
# 1. The installed node_modules
COPY --from=builder /app/node_modules ./node_modules
# 2. The application's source code (app.js, etc.)
COPY --from=builder /app/app.js ./
# (If you had other config files like .env templates or static assets needed at runtime, you'd copy them here too)

# Set environment variables for the production environment
# These can be overridden by Docker Compose environment variables
ENV NODE_ENV=production \
    PORT=8080

# Switch to the non-root user for running the application
USER appuser

# Expose the port your application will listen on
EXPOSE ${PORT}

# Define the command to run your application when the container starts
CMD ["node", "app.js"]
