#!/bin/bash
back_tests () {
  printf '> Starting back-end tests\n'

  cd ./back-end

  npm run tests

  printf '\n> Script ended\n\n'
}

back_tests