# yappi frontend

This is the UI for the yappi project and was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### 🚀 Getting Started

##### First, clone the repository to your local machine:

```bash
git clone https://github.com/24FSIIT16/dear-dev-frontend.git
```

##### Install the Dependencies:

```bash
npm install
```

##### Run the Development Server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 🔒 Setup authentication

Authentication is done using [Auth.js](https://authjs.dev/) (NextAuth).

Follow the Auth.js getting-started guide for creating an auth secret: [Getting Started](https://authjs.dev/getting-started/installation)

At the moment, the project only supports Github and Google authentication.
Follow the Auth.js providers guide for setting up GitHub and Google OAuth providers:

- [GitHub](https://authjs.dev/getting-started/authentication/oauth)
- [Google](https://authjs.dev/getting-started/authentication/oauth)

To setup authentication, you need to create a `.env.local` file in the root directory and add the following environment variables:

```bash
# Auth.js
AUTH_SECRET=your_auth_secret
AUTH_TRUST_HOST=TRUE
AUTH_URL=http://localhost:3000

# Providers
AUTH_GITHUB_ID=your_github_id
AUTH_GITHUB_SECRET=your_github_secret
AUTH_GOOGLE_ID=your_google_id
```

To use the authentication in the project, you need to use the application with the yappi backend. This is because of the used Database Adapter [PostgeSQL Adapter](https://authjs.dev/getting-started/adapters/pg).

Have a look at: `auth.ts`file in the project to see how the authentication is implemented.

### 💾 Setup API, Database and Backend

If the yappi UI is used in conjunction with the yappi backend you need to add the following environment variables to the `.env.local` file:

```bash
# yappi DB
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=yappi_db
DATABASE_USER=yappi_db_admin
DATABASE_PASSWORD=your_db_password

# JWT Secret, use the same in the backend
JWT_SECRET=your_jwt_secret

# API URL
NEXT_PUBLIC_API_URL=http://localhost:8080
```

If you made changes in the backend regarding databse or ports, you need to adjust the environment variables accordingly.

### 📊 Setup Github Contribution Graph

To combine your tracked happiness data with code contributions from github, you need to add the following environment variables to the `.env.local` file:

```bash
NEXT_PUBLIC_GITHUB_TOKEN=your_personal_github_token
```

To create a personal acces token, follow the guide: [Creating a personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
Minimal scope of the token: `read:user`

##### Start the project with docker-compose:

```bash
docker compose up -d
```

**Attention:** You have to change the .env file to .env.local in the `docker-compose.yml` file.
This will build the project and start it in a docker container, that includes the database as well. The project will be running on `http://localhost:3000`.

If you want to change for example the database name, you can do so in the `docker-compose.yml` file.

### 🛟 Usefull Docker Commands

List all running container:

```bash
docker ps
```

Clean and remove docker images / container

```bash
sudo docker stop $(sudo docker ps -q)  true
sudo docker rm $(sudo docker ps -a -q)  true
sudo docker image rm $(sudo docker images -q) || true
```

View logs of the running container:

```bash
docker logs -f <container_id>
```

Delete docker volumes:

```bash
docker volumne prune -f
```

### 📦 Built With

- React
- Next.js
- TypeScript
- Auth.js
- shadcn/ui
- Framer Motion
