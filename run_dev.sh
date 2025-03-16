cd app
docker compose -f docker-compose-dev.yaml up -d
cd webfront
npm run dev &
cd ../api
npm run dev

sleep 5s
open http://localhost:3000
start http://localhost:3000