#!/bin/bash

reset_db () {
  printf '> Starting database reset\n'

  cd ./back-end

  npx sequelize-cli db:drop
  npx sequelize-cli db:create
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all

  printf '\n> Script ended\n\n'
}

reset_db