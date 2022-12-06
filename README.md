# Udemy NestJS course 3 (TesloShop)
NestJS Project based in the TesloShop exercise from Udemy course ["Nest: Desarrollo backend escalable con Node"](https://www.udemy.com/course/nest-framework/) by Fernando Herrera

# Stack
* PostgreSQL
* NestJS

# Dev environment execution
1. Clone repo
2. Exec with:
```
npm install
```
3. Install Nest CLI
```
npm i -g @nestjs/cli
```
4. Up database
```
docker-compose up -d
```
5. Clone file `.env.template` and rename it to `.env`
6. Fill environment vars in `.env`
7. Execute app in dev environment
```
npm run start:dev
```
8. Rebuild DB with seed
```
GET http://localhost:3000/api/v2/seed
```

# Production Build
1. Generate  `.env.prod`
2. Fill environment vars in `.env.prod`
3. Generate new Docker image
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```