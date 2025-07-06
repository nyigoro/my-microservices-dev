// Makefile
up:
	docker compose up --build

down:
	docker compose down

reset-db:
	docker volume rm my-microservices-dev_db_data
