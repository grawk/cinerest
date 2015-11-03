# cinerest

A sample API application built using [ExpressJS](http://expressjs.com), [swaggerize-express](https://github.com/krakenjs/swaggerize-express), 
and [MongoDB](https://www.mongodb.org).

Note that documentation of responses below is copied from the JSON swagger spec, which itself can be found at:
[config/api.json](config/api.json)

## Prerequisite

* mongodb server running on localhost, default port
* node.js installed (>= v0.12.5)

## Install and run

### Install

```shell
git clone https://github.com/grawk/cinerest.git && cd cinerest && npm i
```

### Populate DB

```shell
node populate.js
```

### Run

```shell
npm start
```

## GET /api/movies

Returns a list of movies in JSON format. List is paginated at six items per page.

### query parameter

* **page** (Number): which page of movie results to view

### response

```js
    "MovieList": {
      "type": "object",
      "properties": {
        "page": {
          "type": "integer",
          "format": "int64"
        },
        "list": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Movie"
          }
        }
      }
    },
```

## POST /api/movies

Add a new movie

### body parameter

* **name** (String): Name of movie

### response

```js
"responses": {
  "200": {
    "description": "movie response",
    "schema": {
      "$ref": "#/definitions/Movie"
    }
  },
  "default": {
    "description": "unexpected error",
    "schema": {
      "$ref": "#/definitions/Error"
    }
  }
}
```

## GET /api/movies/{id}

Retrieve a single movie

### path parameter

* **id** (MongoDB ObjectID): which movie document you wish to view

### response

```js
    "Movie": {
      "type": "object",
      "allOf": [
        {
          "$ref": "#/definitions/NewMovie"
        },
        {
          "required": [
            "id"
          ],
          "properties": {
            "id": {
              "type": "string"
            }
          }
        }
      ]
    },
    "NewMovie": {
      "type": "object",
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string"
        }
      }
    },
```


## PUT /api/movies/{id}

Edit a single movie

### path parameter

* **id** (MongoDB ObjectID): which movie document you wish to view

### body parameter

* **name** (String): Name of movie

### response

```js
"responses": {
  "200": {
    "description": "movie edit response",
    "schema": {
      "$ref": "#/definitions/Updated"
    }
  },
  "default": {
    "description": "unexpected error",
    "schema": {
      "$ref": "#/definitions/Error"
    }
  }
}
```

## DELETE /api/movies/{id}

Delete a single movie

### path parameter

* **id** (MongoDB ObjectID): which movie document you wish to delete

### response

```js
"responses": {
  "204": {
    "description": "movie deleted",
    "schema": {
      "$ref": "#/definitions/Updated"
    }
  },
  "default": {
    "description": "unexpected error",
    "schema": {
      "$ref": "#/definitions/Error"
    }
  }
}
```