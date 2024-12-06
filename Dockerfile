# Stage 1: Build Stage
FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production Stage
FROM node:23-alpine

RUN npm install -g serve

WORKDIR /app

# Copy only the built files from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist"]