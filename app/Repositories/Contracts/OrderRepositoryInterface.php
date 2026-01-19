<?php

namespace App\Repositories\Contracts;

use App\Models\Order;

interface OrderRepositoryInterface
{
    /**
     * Create a new order.
     *
     * @param array $data
     * @return Order
     */
    public function create(array $data): Order;

    /**
     * Find an order by ID.
     *
     * @param int $id
     * @return Order|null
     */
    public function find(int $id): ?Order;

    /**
     * Find an order by ID with order items relationship loaded.
     *
     * @param int $id
     * @return Order|null
     */
    public function findWithItems(int $id): ?Order;
}
