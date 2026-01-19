<?php

namespace App\Models;

use App\Jobs\NotifyLowStock;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'stock_quantity',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
        ];
    }

    protected static function booted(): void
    {
        static::updated(function (Product $product) {
            // Check if stock_quantity was changed and is now below 5
            if ($product->wasChanged('stock_quantity') && $product->stock_quantity < 5) {
                // Check if it wasn't already low before (to prevent duplicate notifications)
                $originalStock = $product->getOriginal('stock_quantity');
                if ($originalStock >= 5) {
                    // Only notify if it just dropped below 5
                    NotifyLowStock::dispatch($product);
                }
            }
        });
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
