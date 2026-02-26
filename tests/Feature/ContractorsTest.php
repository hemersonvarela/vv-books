<?php

use App\Models\Contractor;
use App\Models\User;

it('allows authenticated users to do contractor crud', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/contractors')
        ->assertOk();

    $this->actingAs($user)
        ->post('/contractors', [
            'name' => 'Contractor One',
            'company_name' => 'Build It Co',
            'email' => 'contractor@example.com',
            'phone' => '555-0000',
            'tax_id' => 'TAX-789',
            'notes' => 'Some contractor notes',
        ])
        ->assertRedirect('/contractors');

    $contractor = Contractor::query()->where('email', 'contractor@example.com')->firstOrFail();

    $this->actingAs($user)
        ->put("/contractors/{$contractor->id}", [
            'name' => 'Contractor One Updated',
            'company_name' => 'Build It Co',
            'email' => 'contractor@example.com',
            'phone' => '555-1111',
            'tax_id' => 'TAX-789',
            'notes' => 'Updated contractor notes',
        ])
        ->assertRedirect('/contractors');

    $this->actingAs($user)
        ->delete("/contractors/{$contractor->id}")
        ->assertRedirect('/contractors');

    $this->assertSoftDeleted('contractors', [
        'id' => $contractor->id,
    ]);
});
