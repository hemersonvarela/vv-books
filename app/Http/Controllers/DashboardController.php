<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use App\Models\Transaction;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DashboardController extends Controller
{
    public function __invoke(): InertiaResponse
    {
        $unverifiedCount = Transaction::whereNull('verified_at')->count();
        $noPartnerCount = Transaction::whereNull('partner_id')->count();

        $activePartners = Partner::orderBy('name')->get();
        $partnerIds = $activePartners->pluck('id');

        $transactionData = Transaction::whereYear('date', now()->year)
            ->whereIn('partner_id', $partnerIds)
            ->selectRaw('partner_id, MONTH(date) as month, type, SUM(amount) as total')
            ->groupBy('partner_id', 'month', 'type')
            ->get()
            ->groupBy('partner_id');

        return Inertia::render('dashboard', [
            'stats' => [
                'unverified_transactions' => $unverifiedCount,
                'no_partner_transactions' => $noPartnerCount,
            ],
            'partnerYearlyTotals' => $this->partnerYearlyTotals($activePartners, $transactionData),
            'partnerMonthlyTotals' => $this->partnerMonthlyTotals($activePartners, $transactionData),
            'currentYear' => now()->year,
        ]);
    }

    /**
     * Yearly income/expense totals per active partner for the current year.
     *
     * @param  Collection<int, Partner>  $activePartners
     * @param  Collection<int, Collection>  $transactionData
     * @return array<int, array{id: int, name: string, income: string|null, expense: string|null, net: string}>
     */
    private function partnerYearlyTotals(Collection $activePartners, Collection $transactionData): array
    {
        return $activePartners->map(function (Partner $partner) use ($transactionData): array {
            $rows = $transactionData->get($partner->id, collect());
            $income = (float) $rows->where('type', 'income')->sum('total');
            $expense = (float) $rows->where('type', 'expense')->sum('total');
            $net = $income - $expense;

            return [
                'id' => $partner->id,
                'name' => $partner->name,
                'income' => $income > 0 ? number_format($income, 2) : null,
                'expense' => $expense > 0 ? number_format($expense, 2) : null,
                'net' => number_format($net, 2),
            ];
        })->values()->all();
    }

    /**
     * Monthly income/expense totals per active partner for the current year.
     *
     * @param  Collection<int, Partner>  $activePartners
     * @param  Collection<int, Collection>  $transactionData
     * @return array<int, array{id: int, name: string, months: array<int, array{income: string|null, expense: string|null}>}>
     */
    private function partnerMonthlyTotals(Collection $activePartners, Collection $transactionData): array
    {
        return $activePartners->map(function (Partner $partner) use ($transactionData): array {
            $byMonth = $transactionData->get($partner->id, collect())->groupBy('month');

            $months = [];
            for ($m = 1; $m <= 12; $m++) {
                $rows = $byMonth->get($m, collect());
                $income = (float) $rows->where('type', 'income')->sum('total');
                $expense = (float) $rows->where('type', 'expense')->sum('total');

                $months[$m] = [
                    'income' => $income > 0 ? number_format($income, 2) : null,
                    'expense' => $expense > 0 ? number_format($expense, 2) : null,
                ];
            }

            return [
                'id' => $partner->id,
                'name' => $partner->name,
                'months' => $months,
            ];
        })->values()->all();
    }
}
