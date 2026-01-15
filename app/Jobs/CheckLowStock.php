<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Product;
use App\Mail\LowStockNotification;
use Illuminate\Support\Facades\Mail;

class CheckLowStock implements ShouldQueue
{
    use Queueable;

    public $product;

    /**
     * Create a new job instance.
     */
    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($this->product->stock_quantity < 5) {
            Mail::to(config('admin.email'))->send(new LowStockNotification($this->product));
        }
    }
}
