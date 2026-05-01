# Variables
APP_NAME = AuthInGo
MAIN_PATH = ./main.go
BINARY_PATH = ./bin/$(APP_NAME)
MIGRATION_DIR = ./db/migrations
DB_DRIVER = mysql
DB_URL = root:root123@tcp(127.0.0.1:3306)/auth_dev

.DEFAULT_GOAL := run

## —— App ————————————————————————————————————
run:
	@go run $(MAIN_PATH)

build:
	@go build -o $(BINARY_PATH) $(MAIN_PATH)

clean:
	@rm -rf ./bin

## —— Goose Migrations ————————————————————————————————————
migrate-up:
	@echo "Running migrations..."
	@goose -dir $(MIGRATION_DIR) $(DB_DRIVER) "$(DB_URL)" up

migrate-down:
	@echo "Rolling back last migration..."
	@goose -dir $(MIGRATION_DIR) $(DB_DRIVER) "$(DB_URL)" down

migrate-reset:
	@echo "Resetting all migrations..."
	@goose -dir $(MIGRATION_DIR) $(DB_DRIVER) "$(DB_URL)" reset

migrate-status:
	@echo "Migration status..."
	@goose -dir $(MIGRATION_DIR) $(DB_DRIVER) "$(DB_URL)" status

migrate-create:
	@echo "Creating migration: $(name)"
	@goose -dir $(MIGRATION_DIR) create $(name) sql

## —— Dev ————————————————————————————————————
tidy:
	@go mod tidy

test:
	@go test ./... -v

.PHONY: run build clean migrate-up migrate-down migrate-reset migrate-status migrate-create tidy test