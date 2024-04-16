## Setup

I have containerized the application, database,nginx and cache services with docker. So, we can easily run docker by the command as follows without having to install anything on our machine or server. We only need to install docker.

I request you to do production setup for testing application. It will be fast. 

### Production Setup

#### Method 1

1. Download the zip folder or git clone the repo.
2. cd /folder_name
3. Create a new file called .env and copy contents of .env.example. It will connect to the database from our container. In the future, if we want to use third party database services, we can change .env variables here.
4. run `sh scripts/prod-start.sh`. It will start all our containers, migrate database and seed dummy data.
5. After all the things are going well, we can see message for completing seeding.
6. We can check localhost:5001/health to check if app is working well.

### Method 2.

The first three steps will be the same. If script from step 4 is not working , we can directly start containers by docker commands as follows.

1. `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`. This command will run all our containers. We can check lists of our running container by `docker-compose ps` command after finishing.
2. If containers are running well, we need to migrate and seed database. `docker exec blog-be npm run db:migrate & docker exec blog-be npm run db:push & docker exec blog-be npm run db:seed` command will setup database and dump data.
3. After all the things are going well, we can see message for completing seeding.
4. We can check localhost:5001/health to check if app is working well.


### Development Setup

1. Download the zip folder or git clone the repo.
2. cd /folder_name
3. Create a new file called .env and copy contents of .env.example. It will connect to the database from our container. In the future, if we want to use third party database services, we can change .env variables here.
4. `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build`. This command will run all our containers. We can check lists of our running container by `docker-compose ps` command after finishing.
5. If containers are running well, we need to migrate and seed database. `docker exec blog-be npm run db:migrate & docker exec blog-be npm run db:push & docker exec blog-be npm run db:seed` command will setup database and dump data.
6. After all the things are going well, we can see message for completing seeding.
7. We can check localhost:5001/health to check if app is working well.