<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePartnerRequest;
use App\Http\Requests\UpdatePartnerRequest;
use App\Models\Partner;
use App\Models\Project;
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
        return Inertia::render('partners/create', [
            'projects' => Project::query()->orderBy('name')->get(),
        ]);
    }

    public function store(StorePartnerRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $projectIds = $data['project_ids'] ?? [];
        unset($data['project_ids']);

        $partner = Partner::create($data);
        $partner->projects()->sync($projectIds);

        return redirect()->route('partners.index');
    }

    public function edit(Partner $partner): InertiaResponse
    {
        return Inertia::render('partners/edit', [
            'partner' => $partner->load('projects'),
            'projects' => Project::query()->orderBy('name')->get(),
        ]);
    }

    public function update(UpdatePartnerRequest $request, Partner $partner): RedirectResponse
    {
        $data = $request->validated();
        $projectIds = $data['project_ids'] ?? [];
        unset($data['project_ids']);

        $partner->update($data);
        $partner->projects()->sync($projectIds);

        return redirect()->route('partners.index');
    }

    public function destroy(Partner $partner): RedirectResponse
    {
        $partner->projects()->detach();
        $partner->delete();

        return redirect()->route('partners.index');
    }
}
