FROM node:12-slim

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY src/* /app/src/
COPY public/* /app/public/

CMD ["npm start"]
