# Base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json file
COPY package*.json ./

ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ARG NEXTAUTH_URL

ENV NEXTAUTH_URL=${NEXTAUTH_URL}

ARG AUTH_GITHUB_ID

ENV AUTH_GITHUB_ID=${AUTH_GITHUB_ID}


ARG AUTH_GITHUB_SECRET

ENV AUTH_GITHUB_SECRET=${AUTH_GITHUB_SECRET}

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the app
CMD ["npm", "start"]