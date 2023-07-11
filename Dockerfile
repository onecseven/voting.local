FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm run build
EXPOSE 3333
CMD [ "node", "./dist/index.js" ]