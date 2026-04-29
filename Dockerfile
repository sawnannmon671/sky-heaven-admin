# Use official Node.js 18 slim image as the base
FROM node:22-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies for Prisma and Node.js
RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Set npm configuration to ensure Linux binaries are installed for native modules like lightningcss
RUN echo "supportedArchitectures.os=[\"linux\"]\nsupportedArchitectures.cpu=[\"x64\"]\nsupportedArchitectures.libc=[\"glibc\"]" > .npmrc

# Copy prisma directory to allow postinstall script to generate Prisma Client
COPY prisma ./prisma/

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Include your .env file in the build
COPY .env .env

# Generate Prisma Client
RUN npx prisma generate

# Set Node.js memory limit for the build process
ENV NODE_OPTIONS="--max-old-space-size=1536"

# Build the Next.js app for production
RUN npm run build

# Expose the Next.js port (3000 by default)
EXPOSE 3000

# Run Prisma migrations and then start the Next.js server in production mode
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
