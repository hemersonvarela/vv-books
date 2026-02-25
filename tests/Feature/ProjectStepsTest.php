<?php

use App\Models\ProjectStep;
use App\Models\User;

it('allows authenticated users to do project step crud', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/project-steps')
        ->assertOk();

    $this->actingAs($user)
        ->post('/project-steps', [
            'code' => 'S01',
            'name' => 'First Step',
            'description' => 'Initial step description',
            'step_order' => 1,
            'status' => true,
        ])
        ->assertRedirect('/project-steps');

    $step = ProjectStep::query()->where('code', 'S01')->firstOrFail();

    $this->actingAs($user)
        ->put("/project-steps/{$step->id}", [
            'code' => 'S1U',
            'name' => 'First Step Updated',
            'description' => 'Updated description',
            'step_order' => 1,
            'status' => false,
        ])
        ->assertRedirect('/project-steps');

    $this->actingAs($user)
        ->delete("/project-steps/{$step->id}")
        ->assertRedirect('/project-steps');

    $this->assertSoftDeleted('project_steps', [
        'id' => $step->id,
    ]);
});
