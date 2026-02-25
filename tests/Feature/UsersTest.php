<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows an authenticated user to create a user', function () {
    $actor = User::factory()->create();
    $this->actingAs($actor);

    $response = $this->post('/users', [
        'name' => 'New User',
        'email' => 'newuser@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertRedirect('/users');
    expect(User::where('email', 'newuser@example.com')->exists())->toBeTrue();
});

it('blocks guests from viewing the users index', function () {
    $response = $this->get('/users');
    $response->assertRedirect('/login');
});
