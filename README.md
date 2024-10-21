# Bred

## Description

Bred is a API built using the [NestJS](https://nestjs.com/) framework. It uses
MySQL as the database, managed via the ORM [Sequelize](https://sequelize.org/),
and implements user authentication using JWT.

The project includes API documentation with [Swagger](https://swagger.io/).

## Features

### 1. **JWT Authentication**

The project uses [JWT (JSON Web Tokens)](https://jwt.io/) for secure user
authentication and authorization. This ensures that users can safely log in, and
access control is enforced for protected routes.

### 2. **Database Management with Sequelize**

[Sequelize](https://sequelize.org/) is used as the ORM (Object-Relational
Mapping) tool to manage database interactions. It provides:

- **Model-based database interactions**: Easily map database tables to
  JavaScript/TypeScript models.
- **Database migrations**: Track and apply changes to the database schema.
- **Query building**: Simplifies complex database queries.

### 3. **API Documentation with Swagger**

The project automatically generates API documentation using
[Swagger](https://swagger.io/). With Swagger UI, developers can:

- Explore available endpoints.
- Test API calls directly from the browser.
- View request and response structures.

### 4. **TypeScript Support**

The project is fully written in [TypeScript](https://www.typescriptlang.org/),
which provides:

- Strong type-checking for catching errors at compile time.
- Improved code quality with enhanced IDE support.
- Compatibility with modern JavaScript features.

---

## Technologies

The project uses the following technologies:

- [NestJS](https://nestjs.com/) — A modular framework for building server-side
  applications on Node.js.
- [Sequelize](https://sequelize.org/) — An ORM for working with databases.
- [JWT](https://jwt.io/) — JSON Web Token for authentication.
- [MySQL](https://www.mysql.com/) — A relational database.
- [Swagger](https://swagger.io/) — API documentation generation.
- [Jest](https://jestjs.io/) — Application testing.
- [TypeScript](https://www.typescriptlang.org/) — A statically typed programming
  language.

---

## Installation

#### 1. Clone the repository:

```bash
git clone https://github.com/your-username/bred.git
```

#### 2. Install Dependencies

After cloning the project, navigate into the project folder and install the
necessary dependencies:

```bash
cd bred
npm install
```

#### 3. Environment Variables

Set up environment variables by creating a .env file in the root directory. Add
necessary configuration details such as database connection credentials, JWT
secret, etc.

Example .env file with variables for development:

```bash
SERVER_PORT=
SECRET=
EXPIRES_IN=
DIALECT=
REFRESH_KEY=
HOST_DEV=
DB_PORT_DEV=
DB_USERNAME_DEV=
PASSWORD_DEV=
DATABASE_DEV=
FE_URL=
```

#### 4. Database Setup

Run migrations to set up the database schema:

```bash
npx sequelize-cli db:migrate
```

#### 5. Run the Application To start the project in development mode, use the

following command:

```bash

npm run start:dev
```

#### 6. Access the API Documentation

Once the application is running, access the Swagger UI documentation at:

`http://localhost:SERVER_PORT/api`

---

## Scripts

The project includes various npm scripts for common tasks:

```bash
npm run build - Compiles the TypeScript code into JavaScript in the ./dist folder.
npm run start - Starts the compiled application using Node.js (production mode).
npm run start:dev - Starts the application in development mode with auto-reloading.
npm run start:debug - Starts the application in debug mode with auto-reloading.
npm run start:prod - Starts the application in production mode.
npm run format - Formats the code using Prettier.
npm run lint - Runs ESLint to check and fix code style issues.
npm run test - Runs all tests using Jest.
npm run test:watch - Runs tests in watch mode.
npm run test:cov - Runs tests with code coverage report.
npm run test:debug - Runs tests in debug mode with Node.js inspector.
```

---

## License

This project is licensed under the **UNLICENSED** license. This means that the
project is private and not open for public use or distribution.
