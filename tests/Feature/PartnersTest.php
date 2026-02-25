<?php

use App\Models\Partner;
use App\Models\User;

it('allows authenticated users to do partner crud', function () {
    $user = User::factory()->create();

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
        ])
        ->assertRedirect('/partners');

    $partner = Partner::query()->where('email', 'partner@example.com')->firstOrFail();

    $this->actingAs($user)
        ->put("/partners/{$partner->id}", [
            'name' => 'Partner One Updated',
            'email' => 'partner@example.com',
            'phone' => '555-1111',
            'tax_id' => 'TAX-123',
            'notes' => 'Updated notes',
        ])
        ->assertRedirect('/partners');

    $this->actingAs($user)
        ->delete("/partners/{$partner->id}")
        ->assertRedirect('/partners');

    $this->assertSoftDeleted('partners', [
        'id' => $partner->id,
    ]);
});
