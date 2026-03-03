<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DashboardController extends Controller
{
    public function __invoke(): InertiaResponse
    {
        $unverifiedCount = Transaction::whereNull('verified_at')->count();

        return Inertia::render('dashboard', [
            'stats' => [
                'unverified_transactions' => $unverifiedCount,
            ],
        ]);
    }
}
