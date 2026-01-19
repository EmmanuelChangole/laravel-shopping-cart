# Laravel Shopping Cart

A simple e-commerce shopping cart built with Laravel, React, and Inertia.js.

## Features

- User authentication (register, login, logout)
- Browse products
- Add products to cart
- Update cart quantities
- Checkout and create orders
- Low stock email notifications
- Daily sales reports

## Quick Start

### Installation

1. **Install dependencies:**
   ```bash
   composer install
   npm install
   ```

   2. **Setup environment:**
      ```bash
      cp .env.example .env
      php artisan key:generate
      ```

      3. **Configure database** in `.env`:
         ```env
            DB_CONNECTION=mysql
            DB_HOST=mysql
            DB_PORT=3306
            DB_DATABASE=laravel
            DB_USERNAME=sail
            DB_PASSWORD=password
      ```

4. **Setup Sail and database:**
   ```bash
   ./vendor/bin/sail build --no-cache
   ./vendor/bin/sail up -d
   ./vendor/bin/sail artisan migrate
   ./vendor/bin/sail  artisan db:seed
   ```

5. **Build assets:**
   ```bash
   npm run build
   ```

6. **Start servers:**
   ```bash
   # Terminal 1: Frontend (development)
   npm run dev
   
   # Terminal 3: Queue worker (for notifications)
   ./vendor/bin/sail artisan queue:work
   ```

7. **Access:** `http://localhost:8000`

### Default Login

- Email: `admin@example.com`
- Password: `password`

## Usage

1. **Login** at `/login`
2. **Browse products** at `/products`
3. **Add to cart** by clicking "Add" on any product
4. **View cart** at `/cart`
5. **Checkout** to create an order

## API Endpoints

**Public:**
- `GET /api/products` - List products

**Protected (requires login):**
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/{id}` - Update quantity
- `DELETE /api/cart/{id}` - Remove item
- `POST /api/orders` - Checkout

## Testing Features

**Low Stock Notification:**
```bash
./vendor/bin/sail artisan test:low-stock 1
```

**Daily Sales Report:**
```bash
./vendor/bin/sail artisan test:daily-sales-report
```

## Project Structure

```
app/
├── Http/Controllers/API/     # API controllers
├── Models/                   # Eloquent models
├── Repositories/             # Data access layer
└── Jobs/                     # Background jobs

resources/js/
├── Pages/                    # React pages
├── Components/               # Reusable components
└── utils/                    # Utilities
```

## License

MIT
