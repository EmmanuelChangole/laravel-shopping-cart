<?php

namespace App\Repositories;

use App\Jobs\NotifyLowStock;
use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository implements ProductRepositoryInterface
{
    /**
     * Find a product by ID.
     *
     * @param int $id
     * @return Product|null
     */
    public function find(int $id): ?Product
    {
        return Product::find($id);
    }

    /**
     * Find a product by ID or throw an exception.
     *
     * @param int $id
     * @return Product
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findOrFail(int $id): Product
    {
        return Product::findOrFail($id);
    }

    /**
     * Get paginated products.
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Product::paginate($perPage);
    }

    /**
     * Get all products.
     *
     * @return Collection
     */
    public function all(): Collection
    {
        return Product::all();
    }

    /**
     * Decrement product stock quantity.
     *
     * @param int $productId
     * @param int $quantity
     * @return bool
     */
    public function decrementStock(int $productId, int $quantity): bool
    {
        $product = Product::findOrFail($productId);
        $product->refresh(); // Ensure we have latest state
        $originalStock = $product->stock_quantity;
        
        $result = $product->decrement('stock_quantity', $quantity);
        
        // Manually check and dispatch if needed (backup to model observer)
        // This ensures the notification is sent even if model observer doesn't fire correctly
        $product->refresh();
        if ($originalStock >= 5 && $product->stock_quantity < 5) {
            NotifyLowStock::dispatch($product);
        }
        
        return (bool) $result;
    }
}
