<?php

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows an authenticated user to create a user with projects', function () {
    $actor = User::factory()->create();
    $project1 = Project::factory()->create();
    $project2 = Project::factory()->create();
    $this->actingAs($actor);

    $response = $this->post('/users', [
        'name' => 'New User',
        'email' => 'newuser@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'project_ids' => [$project1->id, $project2->id],
    ]);

    $response->assertRedirect('/users');
    $user = User::where('email', 'newuser@example.com')->first();
    expect($user)->not->toBeNull();
    expect($user->projects)->toHaveCount(2);
});

it('allows an authenticated user to update a user with projects', function () {
    $actor = User::factory()->create();
    $user = User::factory()->create();
    $project1 = Project::factory()->create();
    $this->actingAs($actor);

    $response = $this->put("/users/{$user->id}", [
        'name' => 'Updated User',
        'email' => $user->email,
        'project_ids' => [$project1->id],
    ]);

    $response->assertRedirect('/users');
    $user->refresh();
    expect($user->name)->toBe('Updated User');
    expect($user->projects)->toHaveCount(1);
    expect($user->projects->first()->id)->toBe($project1->id);
});

it('blocks guests from viewing the users index', function () {
    $response = $this->get('/users');
    $response->assertRedirect('/login');
});
