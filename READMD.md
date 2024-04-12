#DB

yarn db:migrate or npm run db:migrate to migrate table
yarn db:push or npm run db:push  to push schema to database
yarn db:studio or npm run db:studio to open studio for database


docker

docker-compose --env-file .env  up -d

docker exec blog-be-app-1 npm run db:migrate & docker exec blog-be-app-1 npm run db:push & docker exec blog-be-app-1 npm run db:seed