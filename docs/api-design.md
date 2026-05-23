# E‑commerce API – Design

## 1. Resources and Endpoints

### 1.1 Products

**GET /api/products**

- Description: Returns a paginated list of products.
- Query params (later): `page`, `pageSize`, `sort`, `q` (search term).
- Response 200 (example):

```json
[
  {
    "id": 1,
    "name": "Sample Product 1",
    "price": 19.99,
    "currency": "USD",
    "inStock": true
  },
  {
    "id": 2,
    "name": "Sample Product 2",
    "price": 29.99,
    "currency": "USD",
    "inStock": false
  }
]
```

**GET /api/products/:id**

- Description: Returns details for a single product.
- Path params: `id` (integer).
- Responses:
  - 200 with product JSON if found.
  - 404 with error body if not found.

Response 200 (example):

```json
{
  "id": 1,
  "name": "Sample Product 1",
  "description": "Short description here",
  "price": 19.99,
  "currency": "USD",
  "inStock": true
}
```
### 1.2 Cart

**POST /api/cart**

- Description: Adds an item to the current cart (or creates a new cart if none exists).
- Request body (example):

```json
{
  "productId": 1,
  "quantity": 2
}
```

- Responses:
  - 200/201 with updated cart.
  - 400 for invalid productId/quantity.

Response 200 (example):

```json
{
  "id": "cart_123",
  "items": [
    {
      "itemId": "item_1",
      "productId": 1,
      "name": "Sample Product 1",
      "quantity": 2,
      "unitPrice": 19.99,
      "lineTotal": 39.98
    }
  ],
  "currency": "USD",
  "cartTotal": 39.98
}
```

**GET /api/cart**

- Description: Returns the current cart for this session/user.
- Response 200: same shape as above, or empty cart if nothing added yet.

### 1.3 Checkout

**POST /api/checkout**

- Description: Validates the current cart and creates an order.
- Request body (example – simplified):

```json
{
  "cartId": "cart_123",
  "customer": {
    "email": "[email protected]"
  },
  "payment": {
    "method": "card",
    "transactionId": "mock_txn_001"
  },
  "shippingAddress": {
    "line1": "123 Main St",
    "city": "Berlin",
    "country": "DE",
    "postalCode": "10115"
  }
}
```

- Responses:
  - 200/201 with order summary when checkout succeeds.
  - 400 for invalid cart or missing fields.
  - 409 if cart is empty or stale.

Response 201 (example):

```json
{
  "orderId": "order_789",
  "cartId": "cart_123",
  "totalAmount": 39.98,
  "currency": "USD",
  "status": "CONFIRMED",
  "createdAt": "2026-05-23T08:00:00Z"
}
```
## 2. Common Conventions

- All endpoints are prefixed with `/api`.
- All requests and responses use JSON.
- Resource names are plural nouns (e.g., `/products`, `/orders`).
- Standard HTTP methods:
  - `GET` for reads
  - `POST` for create / actions
  - `DELETE` for deletions
- Standard HTTP status codes:
  - `200` OK
  - `201` Created
  - `400` Bad Request
  - `404` Not Found
  - `409` Conflict (e.g., empty cart at checkout)
  - `500` Internal Server Error

## 3. Example Flows

### 3.1 Buyer Flow

1. `GET /api/products` – list products.
2. `GET /api/products/:id` – view product details.
3. `POST /api/cart` – add item to cart.
4. `GET /api/cart` – view updated cart.
5. `POST /api/checkout` – create order from cart.

This flow maps directly to the "Buyer" user profile in the mission brief and will be implemented as a dedicated k6 scenario.