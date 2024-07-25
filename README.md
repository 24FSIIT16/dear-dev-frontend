This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

## Deploy to Server

### Make sure to replace your_password_here with your actual password (for db).

echo "POSTGRES_USER=user_name_here" >> .env
echo "POSTGRES_PASSWORD=your_password_here" >> .env

### Set File Permissions: Set the file permissions to restrict access:

chmod 600 .env

### create file & copy the docker-compose.yml from .github/workflows/docker-compose.yml into home/yappi

### run container..

docker-compose up -d

### stop & remove all containers

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

### remove all images

docker rmi $(docker images -q)

### remove all volumes

docker volume rm $(docker volume ls -q)
