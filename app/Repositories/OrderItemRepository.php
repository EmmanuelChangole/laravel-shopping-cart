<?php

namespace App\Repositories;

use App\Models\OrderItem;
use App\Repositories\Contracts\OrderItemRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class OrderItemRepository implements OrderItemRepositoryInterface
{
    /**
     * Create a new order item.
     *
     * @param array $data
     * @return OrderItem
     */
    public function create(array $data): OrderItem
    {
        return OrderItem::create($data);
    }

    /**
     * Create multiple order items.
     *
     * @param array $items
     * @return Collection
     */
    public function createMany(array $items): Collection
    {
        $orderItems = collect();
        
        foreach ($items as $item) {
            $orderItems->push(OrderItem::create($item));
        }
        
        return $orderItems;
    }
}
