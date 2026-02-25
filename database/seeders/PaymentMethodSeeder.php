<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seeds = [
            ['id' => 1, 'name' => 'Check'],
            ['id' => 2, 'name' => 'Bank Transfer'],
            ['id' => 3, 'name' => 'Credit Card'],
            ['id' => 4, 'name' => 'Cash'],
        ];

        PaymentMethod::upsert(
            $seeds,
            ['id'],        // Unique column
            ['name']       // Columns to update
        );

    }
}
