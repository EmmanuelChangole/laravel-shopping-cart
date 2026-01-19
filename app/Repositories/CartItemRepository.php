<?php

namespace App\Repositories;

use App\Models\CartItem;
use App\Repositories\Contracts\CartItemRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class CartItemRepository implements CartItemRepositoryInterface
{
    /**
     * Find cart items by user ID.
     *
     * @param int $userId
     * @return Collection
     */
    public function findByUser(int $userId): Collection
    {
        return CartItem::where('user_id', $userId)->get();
    }

    /**
     * Find cart items by user ID with product relationship loaded.
     *
     * @param int $userId
     * @return Collection
     */
    public function findByUserWithProduct(int $userId): Collection
    {
        return CartItem::with('product')
            ->where('user_id', $userId)
            ->get();
    }

    /**
     * Update or create a cart item.
     *
     * @param array $attributes
     * @param array $values
     * @return CartItem
     */
    public function updateOrCreate(array $attributes, array $values): CartItem
    {
        return CartItem::updateOrCreate($attributes, $values);
    }

    /**
     * Update a cart item.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $cartItem = CartItem::findOrFail($id);
        return $cartItem->update($data);
    }

    /**
     * Delete a cart item.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $cartItem = CartItem::findOrFail($id);
        return $cartItem->delete();
    }

    /**
     * Check if a cart item belongs to a user.
     *
     * @param int $cartItemId
     * @param int $userId
     * @return bool
     */
    public function belongsToUser(int $cartItemId, int $userId): bool
    {
        return CartItem::where('id', $cartItemId)
            ->where('user_id', $userId)
            ->exists();
    }

    /**
     * Delete all cart items for a user.
     *
     * @param int $userId
     * @return bool
     */
    public function deleteByUser(int $userId): bool
    {
        return CartItem::where('user_id', $userId)->delete() > 0;
    }

    /**
     * Find a cart item by ID with product relationship.
     *
     * @param int $id
     * @return CartItem|null
     */
    public function findWithProduct(int $id): ?CartItem
    {
        return CartItem::with('product')->find($id);
    }
}
