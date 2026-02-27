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

            'code' => function (array $attributes) {
                $project = Project::find($attributes['project_id']) ?? Project::factory()->create();
                $step = ProjectStep::find($attributes['project_step_id']) ?? ProjectStep::factory()->create();

                $lastNumber = Transaction::where('project_id', $project->id)
                    ->where('project_step_id', $step->id)
                    ->count();

                return strtoupper($project->code).'-'.strtoupper($step->code).'-'.($lastNumber + 1);
            },
            'partner_id' => $partyType === 'partner' ? Partner::factory() : null,
            'contractor_id' => $partyType === 'contractor' ? Contractor::factory() : null,
            'vendor_id' => $partyType === 'vendor' ? Vendor::factory() : null,

            'date' => fake()->date(),
            'amount' => fake()->randomFloat(2, 1, 20000),
            'type' => fake()->randomElement(['income', 'expense']),
            'description' => fake()->optional()->sentence(),
            'reference' => fake()->optional()->bothify('REF-#####'),
            'verified_at' => fake()->optional()->date(),
        ];
    }
}
