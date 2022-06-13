#!/bin/bash
packages_install () {
  printf '> Installing back-end dependencies\n'

  cd ./back-end

  npm install

  printf '\n> Installing front-end dependencies\n'

  cd ../front-end

  npm install

  printf '\n> Script ended\n\n'
}

packages_install