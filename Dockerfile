FROM node:10-alpine
RUN mkdir app
WORKDIR /app
COPY /dist .
COPY ["package.prod.json", "./"]
RUN mv package.prod.json ./package.json
RUN mkdir node_modules
RUN npm install
RUN npm install pm2 -g
EXPOSE 9000
RUN pm2 start server.js
