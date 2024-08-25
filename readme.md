


1) husky setup 

 1) command npm i husky lint-staged -D
 2) npx husky init

2) ts setup
  1) npm i ts -D
  2)npx tsc --init

  tsconfig --config
    1) rootdir -- /src
    2) outDir  -- /dist
    3) "noImplicitAny": true
    4) check other if necessary

  3) npm i -D @types/node 
  4) npm i ts-node -D 
    
    1) nodemon.json for development perpose
    2) ecosystem.json for production perpose pm2 setup etc

3) eslint setup
  1)npm i @commitlint/cli @commitlint/config-conventional -D
  2) make "commit-msg" file in husk folder and add
 ` #!usr/bin/env sh
 . "$(dirname  -- "$0")/_/husky.sh"

  npx --no-install commitlint --edit "$1" `
  3) make commitlint.config.js on root directory
  add document to commitlint.config.js
  4) now you have add prefix
  



