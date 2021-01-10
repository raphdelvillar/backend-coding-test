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

## pre-push

## winston

Logs are saved in ./logs folder using unix timestamp as filename