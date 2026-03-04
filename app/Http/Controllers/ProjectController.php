<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TransactionCollection;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ProjectController extends Controller
{
    public function index(): InertiaResponse
    {
        $projects = Project::query()
            ->latest('id')
            ->paginate(10);

        return Inertia::render('projects/index', [
            'projects' => new ProjectCollection($projects),
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('projects/create');
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        Project::create($request->validated());

        return redirect()->route('projects.index');
    }

    public function edit(Project $project): InertiaResponse
    {
        return Inertia::render('projects/edit', [
            'project' => (new ProjectResource($project))->resolve(),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $project->update($request->validated());

        return redirect()->route('projects.index');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('projects.index');
    }

    public function transactions(Project $project): InertiaResponse
    {
        $transactions = $project->transactions()
            ->with(['project', 'step', 'category', 'paymentMethod', 'partner', 'contractor', 'vendor'])
            ->leftJoin('project_steps', 'transactions.project_step_id', '=', 'project_steps.id')
            ->orderBy('project_steps.step_order', 'asc')
            ->orderBy('transactions.code', 'asc')
            ->select('transactions.*')
            ->get();

        // Get all partners associated with the project
        $partners = $project->partners()
            ->select('partners.id', 'partners.name')
            ->orderBy('name')
            ->get();

        // Calculate totals by partner
        $partnerTotals = [];
        $unclaimedTotal = 0;

        foreach ($partners as $partner) {
            $partnerTotals[$partner->id] = $transactions
                ->where('partner_id', $partner->id)
                ->sum('amount');
        }

        // Calculate unclaimed (no partner) total
        $unclaimedTotal = $transactions
            ->whereNull('partner_id')
            ->sum('amount');

        // Calculate net total
        $incomeTotal = $transactions
            ->filter(fn ($t) => $t->type === 'income')
            ->sum('amount');

        $expenseTotal = $transactions
            ->filter(fn ($t) => $t->type === 'expense')
            ->sum('amount');

        $netTotal = $incomeTotal - $expenseTotal;

        return Inertia::render('projects/transactions', [
            'project' => (new ProjectResource($project))->resolve(),
            'transactions' => new TransactionCollection($transactions),
            'partners' => $partners,
            'totals' => [
                'net' => number_format($netTotal, 2),
            ],
            'partnerTotals' => collect($partnerTotals)->mapWithKeys(function ($total, $partnerId) {
                return [$partnerId => number_format($total, 2)];
            })->toArray(),
            'unclaimedTotal' => number_format($unclaimedTotal, 2),
            'hasUnclaimed' => $unclaimedTotal != 0,
        ]);
    }

    public function getActive()
    {
        $projects = Project::query()
            ->where('status', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return response()->json($projects);
    }
}
