# Stage 1: Use node:18-bullseye to install dependencies
FROM node:18-bullseye AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the entire project
COPY . .

# Stage 2: Use node:18-alpine for production
FROM node:18-alpine3.20

# Set the working directory
WORKDIR /app

# Copy the source code and dependencies from the builder stage
COPY --from=builder /app /app

# Install production dependencies (if necessary)
RUN npm install --only=production

# Expose the port (from your .env or default)
EXPOSE 5000

# Start the Express.js server
CMD ["npm", "start"]