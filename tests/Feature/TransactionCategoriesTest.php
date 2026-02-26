<?php

use App\Models\TransactionCategory;
use App\Models\User;

it('allows authenticated users to do transaction category crud', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/transaction-categories')
        ->assertOk();

    $this->actingAs($user)
        ->post('/transaction-categories', [
            'code' => 'INC',
            'name' => 'General Income',
            'type' => 'income',
            'notes' => 'General income category',
        ])
        ->assertRedirect('/transaction-categories');

    $category = TransactionCategory::query()->where('code', 'INC')->firstOrFail();

    $this->actingAs($user)
        ->put("/transaction-categories/{$category->id}", [
            'code' => 'IN1',
            'name' => 'Updated Income',
            'type' => 'income',
            'notes' => 'Updated notes',
        ])
        ->assertRedirect('/transaction-categories');

    $this->actingAs($user)
        ->delete("/transaction-categories/{$category->id}")
        ->assertRedirect('/transaction-categories');

    $this->assertDatabaseMissing('transaction_categories', [
        'id' => $category->id,
    ]);
});
