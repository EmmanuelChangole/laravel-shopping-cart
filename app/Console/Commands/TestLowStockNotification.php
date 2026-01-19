<?php

namespace App\Console\Commands;

use App\Jobs\NotifyLowStock;
use App\Models\Product;
use App\Models\User;
use Illuminate\Console\Command;

class TestLowStockNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:low-stock {product_id : The ID of the product to test}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manually trigger a low stock notification for a specific product';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $productId = $this->argument('product_id');
        
        $product = Product::find($productId);
        
        if (!$product) {
            $this->error("Product with ID {$productId} not found.");
            return self::FAILURE;
        }
        
        // Check if admin user exists
        $admin = User::where('email', 'admin@example.com')->first();
        
        if (!$admin) {
            $this->error('Admin user (admin@example.com) not found. Please run: php artisan db:seed --class=AdminUserSeeder');
            return self::FAILURE;
        }
        
        $this->info("Product found: {$product->name}");
        $this->info("Current stock: {$product->stock_quantity}");
        
        // Dispatch the notification job
        NotifyLowStock::dispatch($product);
        
        $this->info('Low stock notification job has been dispatched.');
        $this->info('Make sure the queue worker is running: php artisan queue:work');
        
        return self::SUCCESS;
    }
}
