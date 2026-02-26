<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContractorRequest;
use App\Http\Requests\UpdateContractorRequest;
use App\Models\Contractor;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ContractorController extends Controller
{
    public function index(): InertiaResponse
    {
        $contractors = Contractor::query()
            ->latest('id')
            ->paginate(10);

        return Inertia::render('contractors/index', [
            'contractors' => $contractors,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('contractors/create');
    }

    public function store(StoreContractorRequest $request): RedirectResponse
    {
        Contractor::create($request->validated());

        return redirect()->route('contractors.index');
    }

    public function edit(Contractor $contractor): InertiaResponse
    {
        return Inertia::render('contractors/edit', [
            'contractor' => $contractor,
        ]);
    }

    public function update(UpdateContractorRequest $request, Contractor $contractor): RedirectResponse
    {
        $contractor->update($request->validated());

        return redirect()->route('contractors.index');
    }

    public function destroy(Contractor $contractor): RedirectResponse
    {
        $contractor->delete();

        return redirect()->route('contractors.index');
    }
}
