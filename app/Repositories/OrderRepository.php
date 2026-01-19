<?php

namespace App\Repositories;

use App\Models\Order;
use App\Repositories\Contracts\OrderRepositoryInterface;

class OrderRepository implements OrderRepositoryInterface
{
    /**
     * Create a new order.
     *
     * @param array $data
     * @return Order
     */
    public function create(array $data): Order
    {
        return Order::create($data);
    }

    /**
     * Find an order by ID.
     *
     * @param int $id
     * @return Order|null
     */
    public function find(int $id): ?Order
    {
        return Order::find($id);
    }

    /**
     * Find an order by ID with order items relationship loaded.
     *
     * @param int $id
     * @return Order|null
     */
    public function findWithItems(int $id): ?Order
    {
        return Order::with('orderItems')->find($id);
    }
}
