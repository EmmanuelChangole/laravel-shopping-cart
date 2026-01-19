<?php

namespace App\Console\Commands;

use App\Jobs\GenerateDailySalesReport;
use App\Models\User;
use Illuminate\Console\Command;

class TestDailySalesReport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:daily-sales-report';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manually trigger the daily sales report job';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        // Check if admin user exists
        $admin = User::where('email', 'admin@example.com')->first();
        
        if (!$admin) {
            $this->error('Admin user (admin@example.com) not found. Please run: php artisan db:seed --class=AdminUserSeeder');
            return self::FAILURE;
        }
        
        $this->info('Dispatching daily sales report job...');
        
        // Dispatch the job
        GenerateDailySalesReport::dispatch();
        
        $this->info('Daily sales report job has been dispatched.');
        $this->info('Make sure the queue worker is running: php artisan queue:work');
        
        return self::SUCCESS;
    }
}
