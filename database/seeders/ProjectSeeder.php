<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $seeds = [
            ['id' => 1, 'code' => 'VVH', 'name' => 'Office Operations'],
            ['id' => 2, 'code' => 'VAL', 'name' => 'Valley Run St'],
            ['id' => 3, 'code' => 'GRI', 'name' => 'Grissom St'],
            ['id' => 4, 'code' => 'WIL', 'name' => 'Williamsfield Dr'],
            ['id' => 5, 'code' => 'RIC', 'name' => 'Richland Ave'],
        ];

        Project::upsert(
            $seeds,
            ['id'],        // Unique column
            ['name']       // Columns to update
        );
    }
}
