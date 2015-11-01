# cinerest

```json
{
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Grawk Movies",
    "contact": {
      "name": "grawk",
      "url": "https://github.com/grawk"
    },
    "license": {
      "name": "Apache-2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0"
    }
  },
  "host": "localhost:8003",
  "basePath": "/api",
  "schemes": [
    "http"
  ],
  "paths": {
    "/movies": {
      "get": {
        "tags": [
          "Movie Operations"
        ],
        "summary": "finds movies in the system",
        "responses": {
          "200": {
            "description": "movie response",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Movie"
              }
            },
            "headers": {
              "x-expires": {
                "type": "string"
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "description": "Creates a new movie",
        "operationId": "addMovie",
        "parameters": [
          {
            "name": "movie",
            "in": "body",
            "description": "Movie added",
            "required": true,
            "schema": {
              "$ref": "#/definitions/NewMovie"
            }
          }
        ],
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
      }
    },
    "/movies/{id}": {
      "get": {
        "description": "Returns a movie based on a single ID",
        "operationId": "find movie by id",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of movie to fetch",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
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
      },
      "post": {
        "description": "Edits a movie",
        "operationId": "editMovie",
        "parameters": [
          {
            "name": "movie",
            "in": "body",
            "description": "Movie added",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Movie"
            }
          }
        ],
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
      },
      "delete": {
        "description": "deletes a single movie based on the ID supplied",
        "operationId": "deleteMovie",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of movie to delete",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "204": {
            "description": "movie deleted"
          },
          "default": {
            "description": "unexpected error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Movie": {
      "type": "object",
      "required": [
        "id",
        "name"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "name": {
          "type": "string"
        },
        "tag": {
          "type": "string"
        }
      }
    },
    "NewMovie": {
      "type": "object",
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "tag": {
          "type": "string"
        }
      }
    },
    "Error": {
      "type": "object",
      "required": [
        "code",
        "message"
      ],
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        }
      }
    }
  }
}
```
