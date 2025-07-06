# ---------- Builder Stage ----------
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies early to cache layers
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev

# Copy app source
COPY . .

# ---------- Runtime Stage ----------
FROM node:18-alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app .

# Set correct permissions
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8080

CMD ["node", "app.js"]
