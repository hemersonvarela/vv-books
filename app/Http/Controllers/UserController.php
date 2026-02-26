<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class UserController extends Controller
{
    public function index(): InertiaResponse
    {
        $users = User::query()->paginate(10);

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('users/create', [
            'projects' => Project::query()->orderBy('name')->get(),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $projectIds = $data['project_ids'] ?? [];
        unset($data['project_ids']);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        $user->projects()->sync($projectIds);

        return redirect()->route('users.index');
    }

    public function edit(User $user): InertiaResponse
    {
        return Inertia::render('users/edit', [
            'user' => $user->load('projects'),
            'projects' => Project::query()->orderBy('name')->get(),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();
        $projectIds = $data['project_ids'] ?? [];
        unset($data['project_ids']);

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);
        $user->projects()->sync($projectIds);

        return redirect()->route('users.index');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->projects()->detach();
        $user->delete();

        return redirect()->route('users.index');
    }
}
