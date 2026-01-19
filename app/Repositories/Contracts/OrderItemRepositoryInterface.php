<?php

namespace App\Repositories\Contracts;

use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Collection;

interface OrderItemRepositoryInterface
{
    /**
     * Create a new order item.
     *
     * @param array $data
     * @return OrderItem
     */
    public function create(array $data): OrderItem;

    /**
     * Create multiple order items.
     *
     * @param array $items
     * @return Collection
     */
    public function createMany(array $items): Collection;
}
