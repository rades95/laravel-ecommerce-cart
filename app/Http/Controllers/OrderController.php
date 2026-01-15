<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Jobs\CheckLowStock;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $user = auth()->user();
        $cartItems = $user->cartItems()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        DB::beginTransaction();

        try {
            $totalAmount = 0;

            foreach ($cartItems as $cartItem) {
                if ($cartItem->quantity > $cartItem->product->stock_quantity) {
                    DB::rollBack();
                    return redirect()->route('cart.index')->with('error', 'Not enough stock for ' . $cartItem->product->name);
                }
                $totalAmount += $cartItem->product->price * $cartItem->quantity;
            }

            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'status' => 'completed',
            ]);

            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price,
                ]);

                $product = $cartItem->product;
                $product->stock_quantity -= $cartItem->quantity;
                $product->save();

                if ($product->stock_quantity < 5) {
                    CheckLowStock::dispatch($product);
                }
            }

            $user->cartItems()->delete();

            DB::commit();

            return redirect()->route('dashboard')->with('success', '🎉 Order placed successfully! Total: $' . number_format($totalAmount, 2));

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('cart.index')->with('error', 'Order failed. Please try again.');
        }
    }
}
