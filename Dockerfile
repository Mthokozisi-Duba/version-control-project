# Mthokozisi Duba u24690059 project

FROM node:22

ENV PORT 3000

WORKDIR /u24690059

COPY . .

RUN npm install

CMD ["npm" , "start"]

EXPOSE 3000