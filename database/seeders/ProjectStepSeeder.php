<?php

namespace Database\Seeders;

use App\Models\ProjectStep;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectStepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seeds = [
            ['id' => 1,  'code' => 'LOT', 'name' => 'Lot',                     'step_order' => 1,  'status' => true],
            ['id' => 2,  'code' => 'PLN', 'name' => 'Plans',                   'step_order' => 2,  'status' => true],
            ['id' => 3,  'code' => 'PER', 'name' => 'Permits',                 'step_order' => 3,  'status' => true],
            ['id' => 4,  'code' => 'SCG', 'name' => 'Site Clearing and Grading','step_order' => 4,  'status' => true],
            ['id' => 5,  'code' => 'FND', 'name' => 'Foundation',              'step_order' => 5,  'status' => true],
            ['id' => 6,  'code' => 'SEP', 'name' => 'Septic Tank',             'step_order' => 6,  'status' => true],
            ['id' => 7,  'code' => 'FRM', 'name' => 'Framing',                 'step_order' => 7,  'status' => true],
            ['id' => 8,  'code' => 'PLB', 'name' => 'Plumbing',                'step_order' => 8,  'status' => true],
            ['id' => 9,  'code' => 'ELE', 'name' => 'Electrical',              'step_order' => 9,  'status' => true],
            ['id' => 10, 'code' => 'HVA', 'name' => 'HVAC',                    'step_order' => 10, 'status' => true],
            ['id' => 11, 'code' => 'ROF', 'name' => 'Roofing',                 'step_order' => 11, 'status' => true],
            ['id' => 12, 'code' => 'WND', 'name' => 'Windows and Doors',       'step_order' => 12, 'status' => true],
            ['id' => 13, 'code' => 'INS', 'name' => 'Insulation',              'step_order' => 13, 'status' => true],
            ['id' => 14, 'code' => 'DRY', 'name' => 'Drywall',                 'step_order' => 14, 'status' => true],
            ['id' => 15, 'code' => 'CAB', 'name' => 'Cabinets',                'step_order' => 15, 'status' => true],
            ['id' => 16, 'code' => 'CNT', 'name' => 'Countertops',             'step_order' => 16, 'status' => true],
            ['id' => 17, 'code' => 'FIR', 'name' => 'Fireplace',               'step_order' => 17, 'status' => true],
            ['id' => 18, 'code' => 'TRM', 'name' => 'Trim',                    'step_order' => 18, 'status' => true],
            ['id' => 19, 'code' => 'KIT', 'name' => 'Kitchen',                 'step_order' => 19, 'status' => true],
            ['id' => 20, 'code' => 'BAT', 'name' => 'Baths',                   'step_order' => 20, 'status' => true],
            ['id' => 21, 'code' => 'PNT', 'name' => 'Paint',                   'step_order' => 21, 'status' => true],
            ['id' => 22, 'code' => 'FLR', 'name' => 'Flooring',                'step_order' => 22, 'status' => true],
            ['id' => 23, 'code' => 'BRK', 'name' => 'Brick',                   'step_order' => 23, 'status' => true],
            ['id' => 24, 'code' => 'STN', 'name' => 'Stone',                   'step_order' => 24, 'status' => true],
            ['id' => 25, 'code' => 'SID', 'name' => 'Siding',                  'step_order' => 25, 'status' => true],
            ['id' => 26, 'code' => 'GUT', 'name' => 'Gutters',                 'step_order' => 26, 'status' => true],
            ['id' => 27, 'code' => 'DRV', 'name' => 'Driveway',                'step_order' => 27, 'status' => true],
            ['id' => 28, 'code' => 'LAN', 'name' => 'Landscaping',             'step_order' => 28, 'status' => true],
            ['id' => 29, 'code' => 'TRS', 'name' => 'Trash',                   'step_order' => 29, 'status' => true],
            ['id' => 30, 'code' => 'SAL', 'name' => 'Sale',                    'step_order' => 30, 'status' => true],
        ];

        ProjectStep::upsert(
            $seeds,
            ['id'],                                      // Unique column
            ['name', 'code', 'step_order', 'status']     // Columns to update
        );

    }
}
