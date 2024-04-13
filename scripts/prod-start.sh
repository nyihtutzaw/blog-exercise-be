#!/bin/bash

docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build


docker-compose up -d --wait

sleep 5

(docker exec blog-be npm run db:migrate) &
(docker exec blog-be npm run db:push) &
(docker exec blog-be npm run db:seed) &

echo "Application setup completed in background processes."
