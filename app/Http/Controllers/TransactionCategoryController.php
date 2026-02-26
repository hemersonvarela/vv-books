<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionCategoryRequest;
use App\Http\Requests\UpdateTransactionCategoryRequest;
use App\Models\TransactionCategory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TransactionCategoryController extends Controller
{
    public function index(): InertiaResponse
    {
        $transactionCategories = TransactionCategory::query()
            ->orderBy('type')
            ->orderBy('name')
            ->paginate(10);

        return Inertia::render('transaction-categories/index', [
            'transactionCategories' => $transactionCategories,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('transaction-categories/create');
    }

    public function store(StoreTransactionCategoryRequest $request): RedirectResponse
    {
        TransactionCategory::create($request->validated());

        return redirect()->route('transaction-categories.index');
    }

    public function edit(TransactionCategory $transactionCategory): InertiaResponse
    {
        return Inertia::render('transaction-categories/edit', [
            'transactionCategory' => $transactionCategory,
        ]);
    }

    public function update(UpdateTransactionCategoryRequest $request, TransactionCategory $transactionCategory): RedirectResponse
    {
        $transactionCategory->update($request->validated());

        return redirect()->route('transaction-categories.index');
    }

    public function destroy(TransactionCategory $transactionCategory): RedirectResponse
    {
        $transactionCategory->delete();

        return redirect()->route('transaction-categories.index');
    }
}
