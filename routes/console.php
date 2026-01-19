<?php

use App\Jobs\GenerateDailySalesReport;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule daily sales report to run every evening at 8:00 PM
Schedule::job(new GenerateDailySalesReport)->dailyAt('20:00');
