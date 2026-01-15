<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Daily Sales Report</title>
</head>
<body>
    <h1>Daily Sales Report - {{ $date->format('F j, Y') }}</h1>
    
    <p>Hello Admin,</p>
    
    <p>Here is your daily sales summary for {{ $date->format('F j, Y') }}:</p>
    
    <h2>Summary</h2>
    <ul>
        <li><strong>Total Orders:</strong> {{ $totalOrders }}</li>
        <li><strong>Total Revenue:</strong> ${{ number_format($totalRevenue, 2) }}</li>
        <li><strong>Average Order:</strong> ${{ $totalOrders > 0 ? number_format($totalRevenue / $totalOrders, 2) : '0.00' }}</li>
    </ul>
    
    @if(count($productsSold) > 0)
        <h2>Products Sold Today</h2>
        <table border="1" cellpadding="8" cellspacing="0">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity Sold</th>
                    <th>Unit Price</th>
                    <th>Total Revenue</th>
                </tr>
            </thead>
            <tbody>
                @foreach($productsSold as $item)
                <tr>
                    <td>{{ $item['product']->name }}</td>
                    <td>{{ $item['quantity'] }} units</td>
                    <td>${{ number_format($item['product']->price, 2) }}</td>
                    <td>${{ number_format($item['revenue'], 2) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    @if($orders->count() > 0)
        <h2>Order Details</h2>
        <table border="1" cellpadding="8" cellspacing="0">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                @foreach($orders as $order)
                <tr>
                    <td>#{{ $order->id }}</td>
                    <td>{{ $order->user->name }}</td>
                    <td>{{ $order->orderItems->count() }} items</td>
                    <td>${{ number_format($order->total_amount, 2) }}</td>
                    <td>{{ $order->created_at->format('g:i A') }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p><strong>No orders were placed today.</strong></p>
    @endif
    
    <hr>
    <p><small>Generated on {{ now()->format('F j, Y \a\t g:i A') }}</small></p>
</body>
</html>
