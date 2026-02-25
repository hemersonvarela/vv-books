<?php

use App\Models\User;
use App\Models\Vendor;

it('allows authenticated users to do vendor crud', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/vendors')
        ->assertOk();

    $this->actingAs($user)
        ->post('/vendors', [
            'name' => 'Vendor One',
            'company_name' => 'Acme Inc',
            'email' => 'vendor@example.com',
            'phone' => '555-0000',
            'tax_id' => 'TAX-123',
            'notes' => 'Some notes',
        ])
        ->assertRedirect('/vendors');

    $vendor = Vendor::query()->where('email', 'vendor@example.com')->firstOrFail();

    $this->actingAs($user)
        ->put("/vendors/{$vendor->id}", [
            'name' => 'Vendor One Updated',
            'company_name' => 'Acme Inc',
            'email' => 'vendor@example.com',
            'phone' => '555-1111',
            'tax_id' => 'TAX-123',
            'notes' => 'Updated notes',
        ])
        ->assertRedirect('/vendors');

    $this->actingAs($user)
        ->delete("/vendors/{$vendor->id}")
        ->assertRedirect('/vendors');

    $this->assertSoftDeleted('vendors', [
        'id' => $vendor->id,
    ]);
});
