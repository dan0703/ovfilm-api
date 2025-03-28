FROM node:20.11.1-alpine

# Create app directory
WORKDIR /

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# If you are building your code for production

# Bundle app source
COPY . .

EXPOSE 1624

CMD [ "node", "src/server.js" ]
