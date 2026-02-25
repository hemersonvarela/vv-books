<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePartnerRequest;
use App\Http\Requests\UpdatePartnerRequest;
use App\Models\Partner;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class PartnerController extends Controller
{
    public function index(): InertiaResponse
    {
        $partners = Partner::query()
            ->latest('id')
            ->paginate(10);

        return Inertia::render('partners/index', [
            'partners' => $partners,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('partners/create');
    }

    public function store(StorePartnerRequest $request): RedirectResponse
    {
        Partner::create($request->validated());

        return redirect()->route('partners.index');
    }

    public function edit(Partner $partner): InertiaResponse
    {
        return Inertia::render('partners/edit', [
            'partner' => $partner,
        ]);
    }

    public function update(UpdatePartnerRequest $request, Partner $partner): RedirectResponse
    {
        $partner->update($request->validated());

        return redirect()->route('partners.index');
    }

    public function destroy(Partner $partner): RedirectResponse
    {
        $partner->delete();

        return redirect()->route('partners.index');
    }
}
