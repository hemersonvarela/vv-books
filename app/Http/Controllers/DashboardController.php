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
        $noPartnerCount = Transaction::whereNull('partner_id')->count();

        return Inertia::render('dashboard', [
            'stats' => [
                'unverified_transactions' => $unverifiedCount,
                'no_partner_transactions' => $noPartnerCount,
            ],
        ]);
    }
}
