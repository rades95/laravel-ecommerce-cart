# Laravel E-commerce Shopping Cart

A simple e-commerce shopping cart application built with Laravel, Inertia.js (React), Tailwind CSS, and SQLite.

## Features

### Core Functionality
- **User Authentication** - Laravel Breeze with React
- **Product Browsing** - Grid view with 20 sample products
- **Shopping Cart** - Database-backed cart (no sessions or local storage)
  - Add products to cart
  - Update quantities
  - Remove items
  - Real-time total calculation
  - Stock validation
- **Cart Items Count** - Display in navigation header
- **Flash Messages** - Success and error notifications

### Business Logic
- Stock validation (cannot add more items than available)
- Cart items are user-specific (auth required)
- Unique constraint on cart items (user_id, product_id)

### Upcoming Features (Day 3)
- Order/Checkout system
- Stock deduction on order completion
- Low stock email notifications (when stock < 5)
- Daily sales report (scheduled job)

## Tech Stack

**Backend:**
- Laravel 11.x
- PHP 8.2+
- SQLite Database

**Frontend:**
- Inertia.js
- React 18
- Tailwind CSS
- Vite

**Tools:**
- Git / GitHub
- Composer
- NPM

## Database Schema

### Products
- `id`, `name`, `price`, `stock_quantity`, `timestamps`

### Cart Items
- `id`, `user_id`, `product_id`, `quantity`, `timestamps`
- Unique constraint: `(user_id, product_id)`

### Users
- Laravel Breeze default schema

## Setup (Local Development)

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js & NPM
- SQLite

### Installation

```bash
# Clone the repository
git clone https://github.com/rades95/laravel-ecommerce-cart.git
cd laravel-ecommerce-cart

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database
touch database/database.sqlite

# Run migrations and seeders
php artisan migrate --seed

# Seed products and admin user
php artisan db:seed --class=ProductSeeder
php artisan db:seed --class=AdminAndLowStockSeeder

# Install frontend dependencies
npm install

# Start Vite dev server (in separate terminal)
npm run dev

# Start Laravel server
php artisan serve
```

### Access the Application

- **URL:** http://localhost:8000
- **Register** a new user or use:
  - **Admin:** admin@example.com / password

## Project Structure

```
app/
├── Http/Controllers/
│   ├── CartController.php      # Cart operations (add, update, remove)
│   └── ProductController.php   # Product listing
├── Models/
│   ├── Product.php             # Product model
│   ├── CartItem.php            # Cart item model
│   └── User.php                # User model with cart relationship
database/
├── migrations/
│   ├── *_create_products_table.php
│   └── *_create_cart_items_table.php
└── seeders/
    ├── ProductSeeder.php       # 20 sample products
    └── AdminAndLowStockSeeder.php  # Admin user + low stock products
resources/
└── js/
    └── Pages/
        ├── Products/Index.jsx  # Products listing page
        └── Cart/Index.jsx      # Shopping cart page
```

## Usage

1. **Register/Login** - Create an account or login
2. **Browse Products** - Navigate to Products page
3. **Add to Cart** - Click "Add to Cart" on any product
4. **View Cart** - Click "View Cart" or "Cart" in navigation
5. **Update Quantities** - Use +/- buttons or type directly
6. **Remove Items** - Click "Remove" button
7. **See Total** - Total price updates automatically

## Testing Data

### Sample Products
- 20 products seeded with various prices and stock levels
- 3 products with low stock (3 items) for testing notifications:
  - PlayStation 5
  - Xbox Series X
  - Canon EOS R6

### Test Users
- **Admin:** admin@example.com / password
- **Regular users:** Register via /register

## Development Notes

- Cart is stored in database (not session/localStorage)
- Stock validation prevents over-ordering
- Flash messages provide user feedback
- Responsive design with Tailwind CSS
- Hot Module Replacement (HMR) with Vite

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
