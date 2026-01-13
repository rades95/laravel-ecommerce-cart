<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\Hash;

class AdminAndLowStockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );

        Product::whereIn('id', [13, 14, 16])->update(['stock_quantity' => 3]);
        
        echo "Admin user created: admin@example.com / password\n";
        echo "Products with low stock (3 items): PlayStation 5, Xbox Series X, Canon EOS R6\n";
    }
}
