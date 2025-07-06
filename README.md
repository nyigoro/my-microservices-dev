# My Dockerized Dev Environment

This project sets up a local development environment using Docker Compose for a simple web application consisting of:
- A Node.js Express Backend API
- A Static HTML/JS Frontend (served by Nginx)
- A PostgreSQL Database

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running.
- [VS Code](https://code.visualstudio.com/) with the [Docker Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) (recommended).

## Setup and Running

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/my-docker-dev-env.git](https://github.com/your-username/my-docker-dev-env.git) # Replace with your actual repo
    cd my-docker-dev-env
    ```
2.  **Build the images and start the services:**
    ```bash
    docker compose up --build -d
    ```
    * `up`: Starts the containers.
    * `--build`: Builds images if they don't exist or Dockerfiles have changed.
    * `-d`: Runs containers in "detached" mode (in the background).

3.  **Access the applications:**
    * **Frontend:** Open your browser to `http://localhost:3000`
    * **Backend API:** `http://localhost:8080` (you should see "Backend API is running!")

4.  **Initial Database Setup (First Run Only):**
    The `init-db.sql` script will automatically create a `users` table and insert some dummy data when the `database` container starts for the very first time. If you rebuild the `database` service and want to re-run the `init-db.sql`, you'll need to remove the named volume `db_data`:
    ```bash
    docker volume rm my-docker-dev-env_db_data # Or whatever your volume is named
    docker compose up --build -d
    ```

## Development Workflow

-   Make changes to your `frontend/index.html`, `frontend/script.js`, or `backend/app.js`. Thanks to **volume mounts** in `docker-compose.yml`, these changes will automatically reflect in the running containers.
-   For Node.js backend changes, if you're not using a tool like `nodemon` inside the container, you might need to restart the backend service:
    ```bash
    docker compose restart backend
    ```

## Stopping and Cleaning Up

-   **Stop services (keep data and images):**
    ```bash
    docker compose stop
    ```
-   **Stop and remove containers, networks (keep images and volumes):**
    ```bash
    docker compose down
    ```
-   **Stop, remove containers, networks, AND volumes (removes database data!):**
    ```bash
    docker compose down -v
    ```
-   **Remove images (after `docker compose down`):**
    ```bash
    docker rmi my-docker-dev-env-frontend my-docker-dev-env-backend
    ```

## Expanding the Project

-   Add more services (e.g., Redis, a separate admin panel).
-   Implement full CI/CD pipeline using GitHub Actions to build and push Docker images to a registry.
-   Integrate VS Code's "Remote - Containers" for in-container development and debugging.
