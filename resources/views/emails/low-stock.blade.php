<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Low Stock Alert</title>
</head>
<body>
    <h1>Low Stock Alert</h1>
    
    <p>Hello Admin,</p>
    
    <p>A product in your inventory has reached a low stock level.</p>
    
    <h2>Product Details:</h2>
    <ul>
        <li><strong>Product Name:</strong> {{ $product->name }}</li>
        <li><strong>Product ID:</strong> #{{ $product->id }}</li>
        <li><strong>Price:</strong> ${{ number_format($product->price, 2) }}</li>
        <li><strong>Current Stock:</strong> {{ $product->stock_quantity }} units</li>
    </ul>
    
    <p><strong>Action Required:</strong> Please consider restocking this product.</p>
    
    <p>This notification is sent when stock levels fall below 5 units.</p>
    
    <hr>
    <p><small>Sent on {{ now()->format('F j, Y \a\t g:i A') }}</small></p>
</body>
</html>
