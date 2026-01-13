<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        $cartItemsCount = auth()->user()->cartItems()->sum('quantity');
        
        return Inertia::render('Products/Index', [
            'products' => $products,
            'cartItemsCount' => $cartItemsCount
        ]);
    }
}
