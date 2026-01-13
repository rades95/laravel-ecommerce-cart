<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Product;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = auth()->user()->cartItems()->with('product')->get();
        
        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });
        
        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
            'total' => $total
        ]);
    }

    public function add(Request $request)
    {
        \Log::info('Cart add request received', [
            'user_id' => auth()->id(),
            'request_data' => $request->all()
        ]);

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);
        $requestedQuantity = $request->quantity ?? 1;
        
        $cartItem = CartItem::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->first();

        $currentQuantityInCart = $cartItem ? $cartItem->quantity : 0;
        $newTotalQuantity = $currentQuantityInCart + $requestedQuantity;

        if ($newTotalQuantity > $product->stock_quantity) {
            return redirect()->back()->with('error', 'Not enough stock available. Only ' . $product->stock_quantity . ' items in stock.');
        }

        if ($cartItem) {
            $cartItem->quantity = $newTotalQuantity;
            $cartItem->save();
            \Log::info('Cart item updated', ['cart_item_id' => $cartItem->id, 'new_quantity' => $cartItem->quantity]);
        } else {
            $newItem = CartItem::create([
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
                'quantity' => $requestedQuantity
            ]);
            \Log::info('New cart item created', ['cart_item_id' => $newItem->id]);
        }

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }

        if ($request->quantity > $cartItem->product->stock_quantity) {
            return redirect()->back()->with('error', 'Not enough stock available. Only ' . $cartItem->product->stock_quantity . ' items in stock.');
        }

        $cartItem->update([
            'quantity' => $request->quantity
        ]);

        return redirect()->back()->with('success', 'Cart updated!');
    }

    public function destroy(CartItem $cartItem)
    {
        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }

        $cartItem->delete();

        return redirect()->back()->with('success', 'Item removed from cart!');
    }
}
