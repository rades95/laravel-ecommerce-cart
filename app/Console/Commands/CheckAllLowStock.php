<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use App\Jobs\CheckLowStock;

class CheckAllLowStock extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stock:check-low';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check all products with low stock (< 5) and send notification emails';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking for low stock products...');

        $lowStockProducts = Product::where('stock_quantity', '<', 5)->get();

        if ($lowStockProducts->isEmpty()) {
            $this->info('No products with low stock found.');
            return 0;
        }

        $this->info("Found {$lowStockProducts->count()} product(s) with low stock:");

        foreach ($lowStockProducts as $product) {
            $this->line("  - {$product->name} (Stock: {$product->stock_quantity})");
            CheckLowStock::dispatch($product);
        }

        $this->info('Low stock notification jobs dispatched successfully!');
        $this->comment('Run "php artisan queue:work" to process the jobs.');

        return 0;
    }
}
