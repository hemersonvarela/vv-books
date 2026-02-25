<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectStepRequest;
use App\Http\Requests\UpdateProjectStepRequest;
use App\Models\ProjectStep;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ProjectStepController extends Controller
{
    public function index(): InertiaResponse
    {
        $projectSteps = ProjectStep::query()
            ->orderBy('step_order')
            ->paginate(10);

        return Inertia::render('project-steps/index', [
            'projectSteps' => $projectSteps,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('project-steps/create');
    }

    public function store(StoreProjectStepRequest $request): RedirectResponse
    {
        ProjectStep::create($request->validated());

        return redirect()->route('project-steps.index');
    }

    public function edit(ProjectStep $projectStep): InertiaResponse
    {
        return Inertia::render('project-steps/edit', [
            'projectStep' => $projectStep,
        ]);
    }

    public function update(UpdateProjectStepRequest $request, ProjectStep $projectStep): RedirectResponse
    {
        $projectStep->update($request->validated());

        return redirect()->route('project-steps.index');
    }

    public function destroy(ProjectStep $projectStep): RedirectResponse
    {
        $projectStep->delete();

        return redirect()->route('project-steps.index');
    }
}
