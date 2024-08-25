


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

3) commitlint setup
  1)npm i @commitlint/cli @commitlint/config-conventional -D
  2) make "commit-msg" file in husk folder and add
 ` #!usr/bin/env sh
 . "$(dirname  -- "$0")/_/husky.sh"

  npx --no-install commitlint --edit "$1" `
  3) make commitlint.config.js on root directory
  add document to commitlint.config.js
  4) now you have add prefix

4) eslint setup
 1) npm i --save-dev @eslint/js @types/eslint__js typescript-eslint
 2) add eslint.config.mjs 
 3) npx eslint .
 4) add pre-commit script
 5) add scripts in package.json
  "lint-staged": {
    "*.ts": [
      "npm run lint:fix"
    ]
  },
  before pushing it checks it
  
5) prettier setup
  1) npm i --save-dev --save-exact prettier
  2) npm i --save-dev eslint-config-prettier
  3) add scripts in package.json like eslint

6) dotenv-flow
  1) npm i dotenv-flow cross-env
  2) change dev script to " cross-env NODE_ENV=development nodemon src/server.ts"
  3) change start script to " cross-env NODE_ENV=production node dist/server.js" 
  make sure you have .env.development & .env.production
  4) add config files config.ts 

7)   
  



