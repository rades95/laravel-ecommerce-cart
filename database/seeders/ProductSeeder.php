<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            ['name' => 'Laptop Dell XPS 13', 'price' => 1299.99, 'stock_quantity' => 15],
            ['name' => 'iPhone 15 Pro', 'price' => 999.99, 'stock_quantity' => 25],
            ['name' => 'Samsung Galaxy S24', 'price' => 899.99, 'stock_quantity' => 30],
            ['name' => 'Sony WH-1000XM5 Headphones', 'price' => 349.99, 'stock_quantity' => 50],
            ['name' => 'iPad Air', 'price' => 599.99, 'stock_quantity' => 20],
            ['name' => 'MacBook Pro 14"', 'price' => 1999.99, 'stock_quantity' => 10],
            ['name' => 'Apple Watch Series 9', 'price' => 399.99, 'stock_quantity' => 40],
            ['name' => 'AirPods Pro', 'price' => 249.99, 'stock_quantity' => 60],
            ['name' => 'Logitech MX Master 3S', 'price' => 99.99, 'stock_quantity' => 45],
            ['name' => 'Mechanical Keyboard RGB', 'price' => 149.99, 'stock_quantity' => 35],
            ['name' => 'LG 27" 4K Monitor', 'price' => 449.99, 'stock_quantity' => 18],
            ['name' => 'Samsung 55" QLED TV', 'price' => 799.99, 'stock_quantity' => 12],
            ['name' => 'PlayStation 5', 'price' => 499.99, 'stock_quantity' => 8],
            ['name' => 'Xbox Series X', 'price' => 499.99, 'stock_quantity' => 7],
            ['name' => 'Nintendo Switch OLED', 'price' => 349.99, 'stock_quantity' => 22],
            ['name' => 'Canon EOS R6', 'price' => 2499.99, 'stock_quantity' => 5],
            ['name' => 'GoPro Hero 12', 'price' => 399.99, 'stock_quantity' => 28],
            ['name' => 'Bose SoundLink Speaker', 'price' => 129.99, 'stock_quantity' => 55],
            ['name' => 'Kindle Paperwhite', 'price' => 139.99, 'stock_quantity' => 42],
            ['name' => 'Fitbit Charge 6', 'price' => 159.99, 'stock_quantity' => 38],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
