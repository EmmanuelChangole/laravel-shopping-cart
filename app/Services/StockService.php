<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Validation\ValidationException;

class StockService
{
    public function __construct(
        private readonly ProductRepositoryInterface $productRepository
    ) {
    }

    /**
     * Validate if product has sufficient stock for the requested quantity.
     *
     * @param int $productId
     * @param int $requestedQuantity
     * @return Product
     * @throws ValidationException
     */
    public function validateStock(int $productId, int $requestedQuantity): Product
    {
        $product = $this->productRepository->findOrFail($productId);

        if ($product->stock_quantity < $requestedQuantity) {
            throw ValidationException::withMessages([
                'quantity' => "Insufficient stock. Available: {$product->stock_quantity} units",
            ]);
        }

        return $product;
    }

    /**
     * Validate stock for multiple cart items.
     *
     * @param array|\Illuminate\Support\Collection $cartItems Array or Collection of cart items with product relationship
     * @return void
     * @throws ValidationException
     */
    public function validateCartStock($cartItems): void
    {
        $errors = [];

        foreach ($cartItems as $cartItem) {
            $product = $cartItem->product;
            if ($product->stock_quantity < $cartItem->quantity) {
                $errors[] = "Insufficient stock for {$product->name}. Available: {$product->stock_quantity} units";
            }
        }

        if (!empty($errors)) {
            throw ValidationException::withMessages([
                'cart' => $errors,
            ]);
        }
    }

    /**
     * Check if product is in stock.
     *
     * @param int $productId
     * @param int $quantity
     * @return bool
     */
    public function hasStock(int $productId, int $quantity): bool
    {
        $product = $this->productRepository->findOrFail($productId);
        return $product->stock_quantity >= $quantity;
    }
}
