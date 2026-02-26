<?php

use App\Models\Project;
use App\Models\User;

it('allows authenticated users to do project crud', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/projects')
        ->assertOk();

    $this->actingAs($user)
        ->post('/projects', [
            'name' => 'Project One',
            'description' => 'Description for project one',
            'start_date' => '2026-01-01',
            'end_date' => '2026-12-31',
            'status' => 'Active',
            'notes' => 'Some notes',
        ])
        ->assertRedirect('/projects');

    $project = Project::query()->where('name', 'Project One')->firstOrFail();

    $this->actingAs($user)
        ->put("/projects/{$project->id}", [
            'name' => 'Project One Updated',
            'description' => 'Updated description',
            'start_date' => '2026-01-01',
            'end_date' => '2026-12-31',
            'status' => 'Completed',
            'notes' => 'Updated notes',
        ])
        ->assertRedirect('/projects');

    $this->actingAs($user)
        ->delete("/projects/{$project->id}")
        ->assertRedirect('/projects');

    $this->assertSoftDeleted('projects', [
        'id' => $project->id,
    ]);
});
