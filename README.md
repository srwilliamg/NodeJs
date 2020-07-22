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
- docker build Dockfile -t \<app_name\>/<image_name\>
- docker [run | stop | rm | pull]
  - __-i__ &rarr; *interactive mode*
  - __-t__ &rarr; *terminal mode*
  - __-p__ \<*docker_host_port*\>:\<*docker_container_port*\> &rarr; *mapping ports*  
  - __-v__ \<*docker_host_directory*\>:\<*docker_container_directory*\> &rarr; *Data will be store in the external directory of the docker host*
    - docker run -v __/opt/datadir__:__/var/lib/mysql__ mysql
  - __-e__ *enviroment_variable*=*value* &rarr; *set a enviroment variable in container*
- docker ps
- docker inspect /<*container*/> &rarr; *show the state of a acontainer in json format*
- docker images
- docker rmi \<*container*\> &rarr; *Removes images*
- docker exec \<*container*\> \<*command*\> 
  
##### Docker-compose useful commands
-  docker-compose build
-  docker-compose up -d
-  docker exec \<container_id\> env &rarr; *show enviroment variables in the container*