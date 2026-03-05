<?php

namespace Database\Seeders;

use App\Enums\TransactionType;
use App\Models\TransactionCategory;
use Illuminate\Database\Seeder;

class TransactionCategorySeeder extends Seeder
{
    public function run(): void
    {
        $seeds = [
            [
                'id' => 1,
                'code' => 'CC',
                'name' => 'Capital Contribution',
                'type' => TransactionType::Income,
            ],
            [
                'id' => 2,
                'code' => 'SA',
                'name' => 'Sales',
                'type' => TransactionType::Income,
            ],
            //            [
            //                'id' => 3,
            //                'code' => 'O',
            //                'name' => 'Office Supplies',
            //                'type' => TransactionType::Expense
            //            ],
            //            [
            //                'id' => 4,
            //                'code' => '',
            //                'name' => '',
            //                'type' => TransactionType::Expense
            //            ],
            [
                'id' => 5,
                'code' => 'GA',
                'name' => 'General and Administrative',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 6,
                'code' => 'O',
                'name' => 'Office Supplies',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 7,
                'code' => 'SF',
                'name' => 'Software Services',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 8,
                'code' => 'P',
                'name' => 'Professional services',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 9,
                'code' => 'M',
                'name' => 'Materials',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 10,
                'code' => 'R',
                'name' => 'Rentals',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 11,
                'code' => 'ET',
                'name' => 'Equipment And Tools',
                'type' => TransactionType::Expense,
            ],
            //            [
            //                'id' => 12,
            //                'code' => 'ET',
            //                'name' => 'Equipment And Tools',
            //                'type' => TransactionType::Expense
            //            ],
            [
                'id' => 13,
                'code' => 'B',
                'name' => 'Bank Fees',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 14,
                'code' => 'A',
                'name' => 'Assets',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 15,
                'code' => 'G',
                'name' => 'Fuel',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 16,
                'code' => 'MR',
                'name' => 'Maintenance and Repairs',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 17,
                'code' => 'U',
                'name' => 'Utilities',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 18,
                'code' => 'CP',
                'name' => 'City Permits',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 19,
                'code' => 'PT',
                'name' => 'Property Taxes',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 20,
                'code' => 'TR',
                'name' => 'Travel',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 21,
                'code' => 'HV',
                'name' => 'Owner Distribution',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 22,
                'code' => 'I',
                'name' => 'Insurance',
                'type' => TransactionType::Expense,
            ],
            [
                'id' => 23,
                'code' => 'ME',
                'name' => 'Meals',
                'type' => TransactionType::Expense,
            ],
        ];

        TransactionCategory::upsert(
            $seeds,
            ['id'],                      // Unique column
            ['name', 'code', 'type']     // Columns to update
        );
    }
}
