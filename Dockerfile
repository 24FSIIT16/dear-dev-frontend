# Base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json file
COPY package*.json ./

ENV NEXT_PUBLIC_API_URL=http://86.119.49.89:8080

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