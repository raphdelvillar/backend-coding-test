# Tooling

## eslint

Run using `yarn run eslint` or `yarn linter`

1. How would you like to use ESLint? `style`
2. What type of modules does your project use? `commonjs`
3. Which framework does your project use? `none`
4. Does your project use Typescript? `Yes`
5. Where do your code run? `browser, node`
6. What format do you want your config file to be in? `YAML`
7. How would you like to define a style for your project? `guide`
8. Which style guide do you want to follow? `airbnb`

## nyc

Run using `nyc mocha ./tests/*.test.js --exit --inspect=0.0.0.0:9229 --timeout 120000` or `yarn test`

As of branch `tooling-nyc`

File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
:-----------|:--------|:---------|:--------|:--------|:--------------------------------------
All files   |    87.8 |     82.5 |     100 |   87.65 | 
 app.js     |     100 |      100 |     100 |     100 | 
 logger.js  |     100 |      100 |     100 |     100 | 
 routes.js  |   82.76 |    81.58 |     100 |   82.46 | 92-93,101-102,126-127,134-135,168-169
 schemas.js |     100 |      100 |     100 |     100 |                                       

As of branch `pagination`

File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
:-----------|:--------|:---------|:--------|:--------|:--------------------------------------
All files   |    86.67 |     82.61 |     100 |   86.52 | 
 app.js     |     100 |      100 |     100 |     100 | 
 logger.js  |     100 |      100 |     100 |     100 | 
 routes.js  |   81.82 |    81.82 |     100 |   81.54 | 94-95,103-104,111-112,161-162,169-170,203-204
 schemas.js |     100 |      100 |     100 |     100 |                                

As of branch `refactoring`

File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
:-----------|:--------|:---------|:--------|:--------|:--------------------------------------
All files        |   94.51 |       85 |     100 |   96.25 | 
 src             |     100 |      100 |     100 |     100 | 
  app.js         |     100 |      100 |     100 |     100 | 
  enums.js       |     100 |      100 |     100 |     100 | 
  logger.js      |     100 |      100 |     100 |     100 |                   
  routes.js      |     100 |      100 |     100 |     100 | 
 src/health      |     100 |      100 |     100 |     100 | 
  controller.js  |     100 |      100 |     100 |     100 | 
 src/ride        |   87.14 |       80 |     100 |   91.04 |                   
  controller.js  |   82.35 |       90 |     100 |   82.35 | 26-27,49-50,63-64
  service.js     |   91.67 |       70 |     100 |     100 | 37-65
 src/ride/dto    |     100 |    85.71 |     100 |     100 |                   
  ride.dto.js    |     100 |    85.71 |     100 |     100 | 22,29
 src/ride/entity |     100 |    83.33 |     100 |     100 | 
  ride.entity.js |     100 |    83.33 |     100 |     100 | 33                

## pre-push

## winston

Logs are saved in ./logs folder using unix timestamp as filename