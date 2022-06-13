#!/bin/bash
front_start () {
  printf '> Starting front-end\n'

  cd ./front-end

  npm start
}

front_start