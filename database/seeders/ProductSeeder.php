<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create products with varied stock quantities
        // Some with low stock (< 5) to test notifications
        Product::factory()->createMany([
            ['name' => 'Laptop', 'price' => 999.99, 'stock_quantity' => 15],
            ['name' => 'Mouse', 'price' => 29.99, 'stock_quantity' => 50],
            ['name' => 'Keyboard', 'price' => 79.99, 'stock_quantity' => 30],
            ['name' => 'Monitor', 'price' => 299.99, 'stock_quantity' => 4], // Low stock
            ['name' => 'Webcam', 'price' => 89.99, 'stock_quantity' => 2], // Low stock
            ['name' => 'Headphones', 'price' => 149.99, 'stock_quantity' => 25],
            ['name' => 'USB Drive', 'price' => 19.99, 'stock_quantity' => 100],
            ['name' => 'External Hard Drive', 'price' => 129.99, 'stock_quantity' => 3], // Low stock
            ['name' => 'Tablet', 'price' => 399.99, 'stock_quantity' => 10],
            ['name' => 'Smartphone', 'price' => 699.99, 'stock_quantity' => 8],
            ['name' => 'Charger', 'price' => 24.99, 'stock_quantity' => 40],
            ['name' => 'Cable', 'price' => 14.99, 'stock_quantity' => 60],
            ['name' => 'Adapter', 'price' => 34.99, 'stock_quantity' => 1], // Low stock
            ['name' => 'Stand', 'price' => 49.99, 'stock_quantity' => 20],
            ['name' => 'Case', 'price' => 39.99, 'stock_quantity' => 35],
        ]);
    }
}
