<?php

namespace App\Jobs;

use App\Mail\DailySalesReport;
use App\Models\Order;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

class GenerateDailySalesReport implements ShouldQueue
{
    use Queueable;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Get today's date
        $today = Carbon::today();

        // Query orders created today
        $orders = Order::whereDate('created_at', $today)->get();

        // Calculate totals
        $totalProductsSold = $orders->sum(function ($order) {
            return $order->orderItems->sum('quantity');
        });

        $totalRevenue = $orders->sum('total_amount');

        // Find admin user
        $admin = User::where('email', 'admin@example.com')->first();

        if ($admin) {
            Mail::to($admin->email)->send(
                new DailySalesReport($today, $totalProductsSold, $totalRevenue)
            );
        }
    }
}
