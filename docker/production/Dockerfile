FROM Node:20-alpine As base

WORKDIR  /usr/src/ts-backend-prduction-templete

COPY package*.json ./

RUN npm ci --only=prduction

COPY . .

RUN npm run dist

EXPOSE 3000

CMD [ "npm", 'dist']