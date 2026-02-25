<?php

namespace Database\Factories;

use App\Models\Contractor;
use App\Models\Partner;
use App\Models\PaymentMethod;
use App\Models\Project;
use App\Models\ProjectStep;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition(): array
    {
        // Enforce the DB CHECK constraint: at least one of partner/contractor/vendor must be non-null
        $partyType = fake()->randomElement(['partner', 'contractor', 'vendor']);

        return [
            'project_id' => Project::factory(),
            'project_step_id' => ProjectStep::factory(),
            'category_id' => TransactionCategory::factory(),
            'payment_method_id' => PaymentMethod::factory(),

            'partner_id' => $partyType === 'partner' ? Partner::factory() : null,
            'contractor_id' => $partyType === 'contractor' ? Contractor::factory() : null,
            'vendor_id' => $partyType === 'vendor' ? Vendor::factory() : null,

            'date' => fake()->date(),
            'amount' => fake()->randomFloat(2, 1, 20000),
            'direction' => fake()->randomElement(['income', 'expense']),
            'description' => fake()->optional()->sentence(),
            'reference' => fake()->optional()->bothify('REF-#####'),
        ];
    }
}
