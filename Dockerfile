FROM node:latest
COPY . .
WORKDIR /
RUN npm install
EXPOSE 5000
RUN sequelize db:create && sequelize db:migrate
CMD ["npm", "start"]