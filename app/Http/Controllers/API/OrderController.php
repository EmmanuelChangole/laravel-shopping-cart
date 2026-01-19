<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponse;
use App\Repositories\Contracts\CartItemRepositoryInterface;
use App\Repositories\Contracts\OrderItemRepositoryInterface;
use App\Repositories\Contracts\OrderRepositoryInterface;
use App\Repositories\Contracts\ProductRepositoryInterface;
use App\Services\StockService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    use ApiResponse;

    /**
     * Create a new controller instance.
     */
    public function __construct(
        private OrderRepositoryInterface $orderRepository,
        private CartItemRepositoryInterface $cartItemRepository,
        private OrderItemRepositoryInterface $orderItemRepository,
        private ProductRepositoryInterface $productRepository,
        private StockService $stockService
    ) {
    }

    /**
     * Create order from cart items.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // Get user's cart items
        $cartItems = $this->cartItemRepository->findByUserWithProduct($user->id);

        if ($cartItems->isEmpty()) {
            return $this->errorResponse('Cannot create order. Your cart is empty.', [], 400);
        }

        // Validate stock availability for all cart items
        $this->stockService->validateCartStock($cartItems);

        // Create order in transaction
        return DB::transaction(function () use ($user, $cartItems) {
            // Calculate total
            $totalAmount = $cartItems->sum(function ($item) {
                return $item->product->price * $item->quantity;
            });

            // Create order
            $order = $this->orderRepository->create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
            ]);

            // Create order items and update stock
            foreach ($cartItems as $cartItem) {
                // Create order item
                $this->orderItemRepository->create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price, // Snapshot
                ]);

                // Update product stock
                $this->productRepository->decrementStock(
                    $cartItem->product_id,
                    $cartItem->quantity
                );
            }

            // Clear cart
            $this->cartItemRepository->deleteByUser($user->id);

            return $this->successResponse([
                'order' => [
                    'id' => $order->id,
                    'total_amount' => $order->total_amount,
                    'created_at' => $order->created_at,
                ],
            ], 'Order created successfully', 201);
        });
    }
}
