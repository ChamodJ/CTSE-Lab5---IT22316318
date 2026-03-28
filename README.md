# SE4010 Microservices Lab — Node.js + Express

## Project Structure

```
microservices-lab/
├── item-service/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── order-service/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── payment-service/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── api-gateway/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## How to Run

### Step 1 — Build all Docker images
```bash
docker-compose build
```

### Step 2 — Start all services
```bash
docker-compose up
```
Or in background (detached):
```bash
docker-compose up -d
```

### Step 3 — Verify containers are running
```bash
docker ps
```
You should see 4 containers: item-service, order-service, payment-service, api-gateway.

### Stop everything
```bash
docker-compose down
```

---

## API Endpoints (via Gateway on port 8080)

### Item Service
| Method | Endpoint       | Description        | Body                    |
|--------|----------------|--------------------|-------------------------|
| GET    | /items         | Get all items      | —                       |
| POST   | /items         | Add new item       | `{ "name": "Tablet" }`  |
| GET    | /items/{id}    | Get item by ID     | —                       |

### Order Service
| Method | Endpoint       | Description        | Body                                                     |
|--------|----------------|--------------------|----------------------------------------------------------|
| GET    | /orders        | Get all orders     | —                                                        |
| POST   | /orders        | Place new order    | `{ "item": "Laptop", "quantity": 2, "customerId": "C001" }` |
| GET    | /orders/{id}   | Get order by ID    | —                                                        |

### Payment Service
| Method | Endpoint             | Description          | Body                                               |
|--------|----------------------|----------------------|----------------------------------------------------|
| GET    | /payments            | Get all payments     | —                                                  |
| POST   | /payments/process    | Process payment      | `{ "orderId": 1, "amount": 1299.99, "method": "CARD" }` |
| GET    | /payments/{id}       | Get payment by ID    | —                                                  |

---

## Postman Testing Guide

### Setup
1. Open Postman → click **New** → **Collection** → name it `Microservices Lab`
2. Make sure `docker-compose up` is running before testing

### Test 1 — GET All Items
- Method: `GET`
- URL: `http://localhost:8080/items`
- Expected: `200 OK` with JSON array of items

### Test 2 — POST Add Item
- Method: `POST`
- URL: `http://localhost:8080/items`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{ "name": "Headphones" }
```
- Expected: `201 Created` with the new item object

### Test 3 — GET Item by ID
- Method: `GET`
- URL: `http://localhost:8080/items/1`
- Expected: `200 OK` with the item object

### Test 4 — POST Place Order
- Method: `POST`
- URL: `http://localhost:8080/orders`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{ "item": "Laptop", "quantity": 2, "customerId": "C001" }
```
- Expected: `201 Created` with `"status": "PENDING"`

### Test 5 — GET All Orders
- Method: `GET`
- URL: `http://localhost:8080/orders`
- Expected: `200 OK` with the order you just placed

### Test 6 — POST Process Payment
- Method: `POST`
- URL: `http://localhost:8080/payments/process`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{ "orderId": 1, "amount": 1299.99, "method": "CARD" }
```
- Expected: `201 Created` with `"status": "SUCCESS"`

### Test 7 — GET Payment by ID
- Method: `GET`
- URL: `http://localhost:8080/payments/1`
- Expected: `200 OK` with the payment object

---
