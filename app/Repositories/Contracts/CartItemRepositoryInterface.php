<?php

namespace App\Repositories\Contracts;

use App\Models\CartItem;
use Illuminate\Database\Eloquent\Collection;

interface CartItemRepositoryInterface
{
    /**
     * Find cart items by user ID.
     *
     * @param int $userId
     * @return Collection
     */
    public function findByUser(int $userId): Collection;

    /**
     * Find cart items by user ID with product relationship loaded.
     *
     * @param int $userId
     * @return Collection
     */
    public function findByUserWithProduct(int $userId): Collection;

    /**
     * Update or create a cart item.
     *
     * @param array $attributes
     * @param array $values
     * @return CartItem
     */
    public function updateOrCreate(array $attributes, array $values): CartItem;

    /**
     * Update a cart item.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool;

    /**
     * Delete a cart item.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool;

    /**
     * Check if a cart item belongs to a user.
     *
     * @param int $cartItemId
     * @param int $userId
     * @return bool
     */
    public function belongsToUser(int $cartItemId, int $userId): bool;

    /**
     * Delete all cart items for a user.
     *
     * @param int $userId
     * @return bool
     */
    public function deleteByUser(int $userId): bool;

    /**
     * Find a cart item by ID with product relationship.
     *
     * @param int $id
     * @return CartItem|null
     */
    public function findWithProduct(int $id): ?CartItem;
}
