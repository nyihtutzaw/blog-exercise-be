#DB

yarn db:migrate or npm run db:migrate to migrate table
yarn db:push or npm run db:push  to push schema to database
yarn db:studio or npm run db:studio to open studio for database


docker

 sudo  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
 
docker exec blog-be npm run db:migrate & docker exec blog-be npm run db:push & docker exec blog-be npm run db:seed