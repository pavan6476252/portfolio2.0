
# Event Management System Backend

This repository contains the backend for the Event Management System, built using NestJS, TypeORM, Apollo GraphQL, and PostgreSQL. The backend handles various features, including user authentication, event management, education details, and more.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Google Sign-In, Role-based access)
- Event Management (Create, update, and manage events)
- Education Management (Add, update, and manage user education details)
- Project Management (Create and manage projects)
- Blogging System (Create, edit, and manage blog posts)
- Experience Management (Manage user experience details)
- Certification Management (Store and update certifications)
- Integration with Cloudinary for image uploads

## Technologies

- **Backend Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **API**: Apollo GraphQL
- **Authentication**: JWT, Google OAuth
- **File Uploads**: Cloudinary
- **Containerization**: Docker

## Installation

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- PostgreSQL (v12.x or higher)
- Docker (optional, for containerization)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/event-management-backend.git
   cd event-management-backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment variables:

   Create a `.env` file at the root of the project and configure the following variables:

   ```env
    NX_ISOLATE_PLUGINS=false

    JWT_SECRET=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback


    POSTGRES_URL=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

   ```

4. Run the database migrations:

   ```bash
   npm run typeorm migration:run
   ```

5. Start the development server:

   ```bash
   npm run start:dev
   ```

## Usage

The backend server should now be running at `http://localhost:5000`. You can access the GraphQL playground at `http://localhost:5000/graphql`.

### Running in Docker

If you prefer to run the application in Docker:

1. Build the Docker image:

   ```bash
   docker build -t event-management-backend .
   ```

2. Run the container:

   ```bash
   docker run -p 5000:5000 --env-file .env event-management-backend
   ```

## API Documentation

You can access the API documentation through the GraphQL Playground, which provides an interactive interface for testing queries and mutations.

## Contributing

Contributions are welcome! Please fork the repository, create a new branch for your feature or bugfix, and submit a pull request.
 