<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVendorRequest;
use App\Http\Requests\UpdateVendorRequest;
use App\Models\Vendor;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class VendorController extends Controller
{
    public function index(): InertiaResponse
    {
        $vendors = Vendor::query()
            ->latest('id')
            ->paginate(10);

        return Inertia::render('vendors/index', [
            'vendors' => $vendors,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('vendors/create');
    }

    public function store(StoreVendorRequest $request): RedirectResponse
    {
        Vendor::create($request->validated());

        return redirect()->route('vendors.index');
    }

    public function edit(Vendor $vendor): InertiaResponse
    {
        return Inertia::render('vendors/edit', [
            'vendor' => $vendor,
        ]);
    }

    public function update(UpdateVendorRequest $request, Vendor $vendor): RedirectResponse
    {
        $vendor->update($request->validated());

        return redirect()->route('vendors.index');
    }

    public function destroy(Vendor $vendor): RedirectResponse
    {
        $vendor->delete();

        return redirect()->route('vendors.index');
    }
}
