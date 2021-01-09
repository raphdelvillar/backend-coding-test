# Documentation

Used esdocs for generating user manual and used swagger ui for generating api documentation.

## Esdocs

1. Add esdocs using `yarn add esdoc esdoc-standard-plugin`
2. Create .esdoc.json file - ensure that it is utf-8 encoded or else the next step won't work.
3. Run `yarn docs` - this will call ./node_modules/.bin/esdoc and will generate the docs folder which contains the html files for documentation.
4. Expose through the api using express static

## Swagger UI

1. Add swagger-ui-express using `yarn add swagger-ui-express`
2. Add a way to automatically generate the file swagger.json (see src/swagger.js)
2. Modify the routes to provide general information that swagger requires in order to list the apis properly.