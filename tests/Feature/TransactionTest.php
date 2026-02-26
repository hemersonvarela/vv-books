<?php

use App\Models\Transaction;

test('it can create a transaction with verified_at field', function () {
    $transaction = Transaction::factory()->create([
        'verified_at' => '2026-02-26',
    ]);

    expect($transaction->verified_at->format('Y-m-d'))->toBe('2026-02-26');
});

test('verified_at can be null', function () {
    $transaction = Transaction::factory()->create([
        'verified_at' => null,
    ]);

    expect($transaction->verified_at)->toBeNull();
});
