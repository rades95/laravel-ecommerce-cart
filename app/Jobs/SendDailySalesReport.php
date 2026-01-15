<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Order;
use App\Mail\DailySalesReport as DailySalesReportMail;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendDailySalesReport implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $today = Carbon::today();
        
        $orders = Order::with('orderItems.product', 'user')
            ->whereDate('created_at', $today)
            ->get();

        $totalRevenue = $orders->sum('total_amount');
        $totalOrders = $orders->count();

        // Aggregate products sold today
        $productsSold = [];
        foreach ($orders as $order) {
            foreach ($order->orderItems as $item) {
                $productId = $item->product_id;
                if (!isset($productsSold[$productId])) {
                    $productsSold[$productId] = [
                        'product' => $item->product,
                        'quantity' => 0,
                        'revenue' => 0,
                    ];
                }
                $productsSold[$productId]['quantity'] += $item->quantity;
                $productsSold[$productId]['revenue'] += $item->price * $item->quantity;
            }
        }

        // Sort by quantity sold (descending)
        usort($productsSold, function($a, $b) {
            return $b['quantity'] - $a['quantity'];
        });

        Mail::to(config('admin.email'))->send(
            new DailySalesReportMail($orders, $totalRevenue, $totalOrders, $today, $productsSold)
        );
    }
}
