## API Endpoints
# Endpoints

Endpoints are grouped in 4 categories:

- **categories**
- **items**
- **body location**
- **companies**
## Category Endpoints
### GET /api/categories

Gets all categories. Each item is a an object with keys `_id` and `category`.

Should come in this shape:

```json
{
  "filter": null,
	"limit": 25,
	"start": null,
	"status": 200,
	"error": false,
	"message": "Data found.",
	"total": "7 result(s) found.",
    "data": [
	    {
		    "_id": "c70bc8a8-17f3-4e55-b760-8d45dfd80897",
		    "category": "Fitness"
	    },
      ...
    ]
  }
```
### GET /api/categories/:categoryId

Gets a single category using its `_id` same shape as `/api/categories`.

If category does not exist, it returns a 404 response message of `Category not found`.
## Items Endpoints
### GET /api/items

Gets all items. The items are limited to 25 items on first fetch.

```json
{
  "data": [
    {
			"_id": 6543,
			"name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
			"price": "$49.99",
			"body_location": "Wrist",
			"category": "Fitness",
			"imageSrc": "data:image/jpeg...",
      "numInStock": 9,
			"companyId": 19962
		},
    ...
  ]
}
```
### GET /api/items/:itemId

Gets a single item using its `_id` same shape as `/api/items`.

If item does not exist, it returns a 404 response message of `Item not found`

### GET /api/body-location

Gets all body locations. Each document is a an object with keys `_id` and `body_location`.

Should come in this structure:

```json
{
  "filter": null,
	"limit": 25,
	"start": null,
	"status": 200,
	"error": false,
	"message": "Data found.",
	"total": "9 result(s) found.",
    "data": [
	    {
		    "_id": "8827d5b7-51ec-47af-ac47-579c04bdb561",
			  "body_location": "Wrist"
	    },
      ...
    ]
  }
```

### GET /api/companies

Gets all companies. The comapanies are limited to 25 documents on first fetch.

```json
{
  "data": [
    {
			"_id": 19962,
			"name": "Barska",
			"url": "http://www.barska.com/"
		},
  ]
}
```

## GET /api/companies/:companyId

Gets a single item using its `_id` same shape as `/api/companies`.

## GET /api/items/:itemId

Updates stock level based on `_id`. Returns whether the update was successful.

```json
{
	"status": 200,
	"data": {
		"acknowledged": true,
		"modifiedCount": 1,
		"upsertedId": null,
		"upsertedCount": 0,
		"matchedCount": 1
	},
	"message": "Successfully updated stock level to 10"
}
```


































| Endpoint         | Method | Description                                                                    |
| ---------------- | ------ | ------------------------------------------------------------------------------ |
| `/api/categories`| GET    | This endpoint returns an array of objects with all categories and their IDs    |
| `/api/categories/:categoryId`| GET    | This endpoint returns a single category based on provided `id`                   |
| `/api/users/`    | PUT    | This enpoint accepts data in the `body` and updates the user                   |
| `/api/users/:id` | DELETE | This endpoint deletes a user from `users` (not needed for the project)         |
| `/api/friends`   | PATCH  | This endpoint accepts the `id`s of 2 people and will friend, or unfriend, them |