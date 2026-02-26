<?php

use App\Models\Partner;
use App\Models\Project;
use App\Models\User;

it('allows authenticated users to do partner crud', function () {
    $user = User::factory()->create();
    $project1 = Project::factory()->create();
    $project2 = Project::factory()->create();

    $this->actingAs($user)
        ->get('/partners')
        ->assertOk();

    $this->actingAs($user)
        ->post('/partners', [
            'name' => 'Partner One',
            'email' => 'partner@example.com',
            'phone' => '555-0000',
            'tax_id' => 'TAX-123',
            'notes' => 'Some notes',
            'project_ids' => [$project1->id, $project2->id],
        ])
        ->assertRedirect('/partners');

    $partner = Partner::query()->where('email', 'partner@example.com')->firstOrFail();
    expect($partner->projects)->toHaveCount(2);

    $this->actingAs($user)
        ->put("/partners/{$partner->id}", [
            'name' => 'Partner One Updated',
            'email' => 'partner@example.com',
            'phone' => '555-1111',
            'tax_id' => 'TAX-123',
            'notes' => 'Updated notes',
            'project_ids' => [$project1->id],
        ])
        ->assertRedirect('/partners');

    $partner->refresh();
    expect($partner->projects)->toHaveCount(1);
    expect($partner->projects->first()->id)->toBe($project1->id);

    $this->actingAs($user)
        ->delete("/partners/{$partner->id}")
        ->assertRedirect('/partners');

    $this->assertSoftDeleted('partners', [
        'id' => $partner->id,
    ]);
});
