FROM node:22

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci

COPY ./ /app/

RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]