# Constants

ROOT_DIR = .
CLIENT_DIR = $(ROOT_DIR)/client
SERVER_DIR = $(ROOT_DIR)/server
ENV_FILE = $(ROOT_DIR)/.env

NODE_MODULES = node_modules/.bin

# Include env file
# May contain secrets

ifneq ("$(wildcard $(ENV_FILE))","")
	include $(ENV_FILE)
endif

# Info target which lists all targets
info:
	@grep ^.*: Makefile | grep -v info | sed 's/:$$//'

# Combined
lint: lint-server lint-client

install: setup install-server install-client
	echo $(JWT_SECRET)

build: build-client build-server

test: test-client test-server

# Client
start-client:
	@cd $(CLIENT_DIR) && \
	$(NODE_MODULES)/react-scripts start

build-client:
	@cd $(CLIENT_DIR) && \
	$(NODE_MODULES)/react-scripts build

lint-client:
	@cd $(CLIENT_DIR) && \
	$(NODE_MODULES)/eslint --ext=js --ext=jsx src && \
	$(NODE_MODULES)/editorconfig-checker

install-client:
	@cd $(CLIENT_DIR) && \
	yarn install

test-client:
	@cd $(CLIENT_DIR) && \
	echo TO BE IMPLEMENTED

# Server
start-server:
	@cd $(SERVER_DIR) && \
	JWT_SECRET=$(JWT_SECRET) $(NODE_MODULES)/nodemon --exec $(NODE_MODULES)/ts-node src/index.ts

start-database:
	@cd $(SERVER_DIR)/database && \
	docker-compose up

build-server:
	@cd $(SERVER_DIR) && \
	$(NODE_MODULES)/babel src --out-dir dist

lint-server:
	@cd $(SERVER_DIR) && \
	$(NODE_MODULES)/tslint --project . && \
	$(NODE_MODULES)/editorconfig-checker

install-server:
	@cd $(SERVER_DIR) && \
	yarn install

test-server:
	@cd $(SERVER_DIR) && \
	echo TO BE IMPLEMENTED

# Misc
setup:
	@ln -sf ../../build/githooks/pre-commit.sh .git/hooks/pre-commit
	@chmod +x .git/hooks/pre-commit
