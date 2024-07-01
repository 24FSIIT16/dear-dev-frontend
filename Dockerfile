# Base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json file
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]