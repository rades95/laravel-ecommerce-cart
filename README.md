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

# Run migrations and seeders (includes 20 products, 3 with low stock for testing)
php artisan migrate --seed

# Install frontend dependencies
npm install

# Start Vite dev server (in separate terminal)
npm run dev

# Start Laravel server
php artisan serve
```

### Access the Application

- **URL:** http://localhost:8000
- **Register** a new user to start shopping

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
    └── ProductSeeder.php       # 20 sample products (includes low stock items)
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
- Register via /register or use any test account

### Admin Email Configuration
- Set `ADMIN_EMAIL` in `.env` to receive notifications
- Low stock alerts sent when stock < 5
- Daily sales reports sent via scheduled job
- No admin user account required - just a notification recipient

## Running Background Processes

### Queue Worker
Process background jobs (email notifications):
```bash
php artisan queue:work
```

### Scheduler (Local Testing)
Run scheduled tasks (daily sales report at 23:00):
```bash
php artisan schedule:work
```

For production, add to cron:
```bash
* * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1
```

## Testing Key Features

### 1. Shopping Cart & Checkout
- Navigate to `/products` and add items to cart
- Go to `/cart` and click "Proceed to Checkout"
- Success message appears on Dashboard
- Stock is automatically deducted
- Cart is cleared after checkout

### 2. Low Stock Email Notifications
**Automatic:** Triggered when stock falls below 5 after checkout

**Manual check:**
```bash
php artisan stock:check-low
php artisan queue:work --once
```

View emails in `storage/logs/laravel.log` (search for "Low Stock Alert")

### 3. Daily Sales Report
**Manual trigger:**
```bash
php artisan tinker
# Then run: App\Jobs\SendDailySalesReport::dispatch(); exit
php artisan queue:work --once
```

View report in `storage/logs/laravel.log` (search for "Daily Sales Report")
- Shows all products sold today with quantities
- Total orders and revenue
- Individual order details

## Development Notes

- Cart is stored in database (not session/localStorage)
- Stock validation prevents over-ordering
- Flash messages provide user feedback
- Responsive design with Tailwind CSS
- Hot Module Replacement (HMR) with Vite
- Admin notifications via `config('admin.email')`
- Queue system uses `database` driver (jobs table)
- Emails logged to `storage/logs/laravel.log` when using `MAIL_MAILER=log`

## License

No license specified.
