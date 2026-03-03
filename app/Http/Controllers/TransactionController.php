<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Resources\TransactionCollection;
use App\Http\Resources\TransactionResource;
use App\Models\Contractor;
use App\Models\Partner;
use App\Models\PaymentMethod;
use App\Models\Project;
use App\Models\ProjectStep;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\Vendor;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TransactionController extends Controller
{
    public function index(): InertiaResponse
    {
        $query = Transaction::query()
            ->with(['project', 'step', 'category', 'paymentMethod']);

        // Filter by project
        if (request('project_id')) {
            $query->where('project_id', request('project_id'));
        }

        // Filter by verified status
        if (request('verified_status') === 'unverified') {
            $query->whereNull('verified_at');
        } elseif (request('verified_status') === 'verified') {
            $query->whereNotNull('verified_at');
        }

        $transactions = $query->latest('id')->paginate(10);

        return Inertia::render('transactions/index', [
            'transactions' => new TransactionCollection($transactions),
            'projects' => Project::all(['id', 'name']),
            'filters' => [
                'project_id' => request('project_id'),
                'verified_status' => request('verified_status'),
            ],
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('transactions/create', [
            'projects' => Project::all(['id', 'name']),
            'steps' => ProjectStep::all(['id', 'name']),
            'partners' => Partner::all(['id', 'name']),
            'contractors' => Contractor::all(['id', 'name']),
            'vendors' => Vendor::all(['id', 'name']),
            'categories' => TransactionCategory::all(['id', 'name', 'type']),
            'paymentMethods' => PaymentMethod::where('is_active', true)->get(['id', 'name']),
        ]);
    }

    public function store(StoreTransactionRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['code'] = Transaction::generateCode($validated['project_id'], $validated['project_step_id']);
        $validated['verified_at'] = now();

        Transaction::create($validated);

        return redirect()->route('transactions.index');
    }

    public function edit(Transaction $transaction): InertiaResponse
    {
        return Inertia::render('transactions/edit', [
            'transaction' => (new TransactionResource($transaction))->resolve(),
            'projects' => Project::all(['id', 'name']),
            'steps' => ProjectStep::all(['id', 'name']),
            'partners' => Partner::all(['id', 'name']),
            'contractors' => Contractor::all(['id', 'name']),
            'vendors' => Vendor::all(['id', 'name']),
            'categories' => TransactionCategory::all(['id', 'name', 'type']),
            'paymentMethods' => PaymentMethod::where('is_active', true)->get(['id', 'name']),
        ]);
    }

    public function update(UpdateTransactionRequest $request, Transaction $transaction): RedirectResponse
    {
        $validated = $request->validated();

        if ($transaction->project_id != $validated['project_id'] || $transaction->project_step_id != $validated['project_step_id']) {
            $validated['code'] = Transaction::generateCode($validated['project_id'], $validated['project_step_id']);
        }

        $transaction->update($validated);

        return redirect()->route('transactions.index');
    }

    public function destroy(Transaction $transaction): RedirectResponse
    {
        $transaction->delete();

        return redirect()->route('transactions.index');
    }
}
