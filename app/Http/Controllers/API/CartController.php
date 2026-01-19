<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\StoreCartItemRequest;
use App\Http\Requests\API\UpdateCartItemRequest;
use App\Http\Resources\CartItemResource;
use App\Http\Traits\ApiResponse;
use App\Models\CartItem;
use App\Repositories\Contracts\CartItemRepositoryInterface;
use App\Services\StockService;

class CartController extends Controller
{
    use ApiResponse;

    /**
     * Create a new controller instance.
     */
    public function __construct(
        private readonly CartItemRepositoryInterface $cartItemRepository,
        private readonly StockService $stockService
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(\Illuminate\Http\Request $request)
    {
        $cartItems = $this->cartItemRepository->findByUserWithProduct($request->user()->id);

        return CartItemResource::collection($cartItems);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCartItemRequest $request)
    {
        $validated = $request->validated();

        // Validate stock availability
        $this->stockService->validateStock($validated['product_id'], $validated['quantity']);

        $cartItem = $this->cartItemRepository->updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'product_id' => $validated['product_id'],
            ],
            [
                'quantity' => $validated['quantity'],
            ]
        );

        return new CartItemResource($this->cartItemRepository->findWithProduct($cartItem->id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartItemRequest $request, CartItem $cartItem)
    {
        $userId = $request->user()->id;

        // Ensure the cart item belongs to the authenticated user
        if (!$this->cartItemRepository->belongsToUser($cartItem->id, $userId)) {
            return $this->unauthorizedResponse('You do not have permission to update this cart item.');
        }

        $validated = $request->validated();

        $cartItemWithProduct = $this->cartItemRepository->findWithProduct($cartItem->id);
        $product = $cartItemWithProduct->product;

        // Validate stock availability
        $this->stockService->validateStock($product->id, $validated['quantity']);

        $this->cartItemRepository->update($cartItem->id, ['quantity' => $validated['quantity']]);

        return new CartItemResource($this->cartItemRepository->findWithProduct($cartItem->id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(\Illuminate\Http\Request $request, CartItem $cartItem)
    {
        $userId = $request->user()->id;

        // Ensure the cart item belongs to the authenticated user
        if (!$this->cartItemRepository->belongsToUser($cartItem->id, $userId)) {
            return $this->unauthorizedResponse('You do not have permission to remove this cart item.');
        }

        $this->cartItemRepository->delete($cartItem->id);

        return $this->successResponse(null, 'Cart item removed successfully', 200);
    }
}
