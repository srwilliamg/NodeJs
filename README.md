# NodeJs
This is a repository for a Nodejs application with Sequelize as ORM connected to a mysql DB

- How to run? execute the next commands:
  1. __npm__ install
  2. __npm__ install --only=dev
  3. __sequelize__ db:create && __sequelize__ db:migrate
  4. You should change the fields username and password in the file *config/config.json*, 

#### Sequelize useful commands
- __sequelize__ model:create __--name__ parent __--attributes__ id_parent:integer,username:string,createdAt:date,updatedAt:date
- __sequelize__ migration:generate __--name__=migration_name __--version__=1

#### Docker useful commands
-  docker-compose build
-  docker-compose up -d
-  docker exec container env