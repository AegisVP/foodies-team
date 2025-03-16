# Stage 1: Build the React app using Node.js
FROM node:22-alpine AS builder

# Install dependencies
WORKDIR /webfront
COPY /webfront/package*.json ./
RUN npm install

# Build the React app
COPY /webfront ./
RUN npm run build

# Stage 2: Copy built assets to output location
FROM node:22-alpine

# Copy built files from the previous stage
WORKDIR /home/httpdocs
COPY --from=builder /httpdocs ./

# Copy and install the backend
WORKDIR /home/api
COPY /api ./
RUN npm install

# Expose the port and start the server
EXPOSE 3000
CMD ["node", "/home/api/server.js"]
