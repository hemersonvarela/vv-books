<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $seeds = [
            ['id' => 1, 'name' => 'Valley Run St'],
            ['id' => 2, 'name' => 'Grissom St'],
            ['id' => 3, 'name' => 'Williamsfield Dr'],
            ['id' => 4, 'name' => 'Richland Ave'],
        ];

        Project::upsert(
            $seeds,
            ['id'],        // Unique column
            ['name']       // Columns to update
        );
    }
}
