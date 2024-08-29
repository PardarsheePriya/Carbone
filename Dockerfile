# Use a base image with Node.js installed
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install essential packages including git
RUN apk add --no-cache git bash

# Copy the package.json and index.js into the working directory
COPY package.json .
COPY index.js .

# Install the required Node.js packages
RUN npm install

# Expose the port that Carbone.io will run on (default is 3000)
EXPOSE 3000

# Start the Carbone.io application
CMD ["npm", "start"]