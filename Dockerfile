FROM node:18-alpine

# working directory inside the container
WORKDIR /usr/src/app

# git
RUN apk add --no-cache git bash

COPY package.json .
COPY index.js .

RUN npm install

EXPOSE 3000

# Start the Carbone.io application
CMD ["npm", "start"]
