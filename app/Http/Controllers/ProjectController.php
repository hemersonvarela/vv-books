<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
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
            ->paginate(10)
            ->through(fn ($project) => [
                'id' => $project->id,
                'name' => $project->name,
                'status' => $project->status,
                'start_date' => $project->start_date?->format('m/d/Y'),
                'end_date' => $project->end_date?->format('m/d/Y'),
            ]);

        return Inertia::render('projects/index', [
            'projects' => $projects,
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
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'start_date' => $project->start_date?->format('Y-m-d'),
                'end_date' => $project->end_date?->format('Y-m-d'),
                'status' => $project->status,
                'notes' => $project->notes,
            ],
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
}
