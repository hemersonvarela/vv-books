<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seeds = [
            [
                'id' => 1,
                'name' => 'VV-Homes',
                'email' => null,
                'phone' => null,
                'tax_id' => null,
                'notes' => null,
            ],
            [
                'id' => 2,
                'name' => 'Jireh Construction',
                'email' => null,
                'phone' => null,
                'tax_id' => null,
                'notes' => null,
            ],
        ];

        Partner::upsert(
            $seeds,
            ['id'],
            ['name', 'email', 'phone', 'tax_id', 'notes']
        );
    }
}
