<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Low Stock Alert</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <h1 style="color: #dc3545; margin-top: 0;">⚠️ Low Stock Alert</h1>
    </div>

    <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
        <p>Hello Admin,</p>
        
        <p>This is to notify you that a product is running low on stock:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Product Name:</strong> {{ $product->name }}</p>
            <p style="margin: 5px 0;"><strong>Current Stock:</strong> <span style="color: #dc3545; font-weight: bold;">{{ $product->stock_quantity }}</span> units</p>
            <p style="margin: 5px 0;"><strong>Price:</strong> ${{ number_format($product->price, 2) }}</p>
        </div>
        
        <p style="color: #dc3545; font-weight: bold;">⚠️ Warning: Stock quantity is below 5 units. Please consider restocking this product soon.</p>
        
        <p>Thank you for your attention.</p>
    </div>

    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d; font-size: 12px;">
        <p>This is an automated notification from {{ config('app.name') }}.</p>
    </div>
</body>
</html>
