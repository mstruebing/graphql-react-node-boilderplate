# Graphl React Node Boilerplate [![Build Status](https://travis-ci.org/mstruebing/graphql-react-node-boilderplate.svg?branch=master)](https://travis-ci.org/mstruebing/graphql-react-node-boilderplate)

Just because this makes experimenting with graphql easier for me :)

## Features

### Frontend
Build upon [create-react-app](https://github.com/facebook/create-react-app) 
and [apollo-client](https://github.com/apollographql/apollo-client).
[Text](http://www.url.com)
Linting via [editorconfig-checker](https://github.com/editorconfig-checker/editorconfig-checker.javascript) 
and [eslint](https://eslint.org/)

### Backend
Server with node and babel including nodemon for easy development.
Linting via [editorconfig-checker](https://github.com/editorconfig-checker/editorconfig-checker.javascript) 
and [xo](https://github.com/xojs/xo).

### Both
Githook provides linting on every commit.
Makefile for easy usage, see below.

## Sample usage

For a new project do something like this (and replace MY_PROJECT_NAME with your 
actual project name):
```bash
git clone git@github.com:mstruebing/graphql-react-node-boilderplate.git MY_PROJECT_NAME && \
cd MY_PROJECT_NAME && \ 
rm -Rf .git &&  \
git init && \
git add . && \
git commit -m 'initial commit' && \
make install && \
make build
```

You will need to create an `.env` file in the root of the directory where you
can store your secrets.

At the moment only `JWT_SECRET` is needed to sign the jwt-tokens. 

```
export JWT_SECRET='hallowelt'
```

Important commands:
`make start-client`: starts the client for development purpose.
`make start-server`: starts the server for development purpose.

The Graphl-Playground is reachable via 'http://localhost:4000/playground'

Makefile:
In the root of the project is a Makefile:

There is an info target which is the default target and lists all targets:

```
$ make
lint: lint-server lint-client
install: setup install-server install-client
build: build-client build-server
start-client
build-client
lint-client
install-client
start-server
build-server
lint-server
install-server
setup
```
