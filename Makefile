# Vars

rootDir = $$PWD
clientDir = $(rootDir)/client
serverDir = $(rootDir)/server

node_modules = node_modules/.bin

# Combined
lint: lint-server lint-client

install: setup install-server install-client

# Client
start-client:
	cd $(clientDir) && \
	$(node_modules)/react-scripts start

lint-client:
	cd $(clientDir) && \
	$(node_modules)/eslint --ext=js --ext=jsx src && \
	$(node_modules)/editorconfig-checker

install-client:
	cd $(clientDir) && \
	yarn install

# Server
start-server:
	cd $(serverDir) && \
	$(node_modules)/nodemon src/index.js

lint-server:
	cd $(serverDir) && \
	$(node_modules)/xo src && \
	$(node_modules)/editorconfig-checker

install-server:
	cd $(serverDir) && \
	yarn install

# Misc
setup:
	ln -sf ../../build/githooks/pre-commit.sh .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit
