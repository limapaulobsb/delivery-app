#!/bin/bash
back_start () {
  printf '> Starting back-end\n'

  cd ./back-end

  npm run dev
}

back_start