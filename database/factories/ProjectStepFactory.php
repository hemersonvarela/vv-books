<?php

namespace Database\Factories;

use App\Models\ProjectStep;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectStep>
 */
class ProjectStepFactory extends Factory
{
    protected $model = ProjectStep::class;

    public function definition(): array
    {
        // Keep "code" 3 chars and unique, matching the migration constraint.
        return [
            'code' => strtoupper(fake()->unique()->lexify('???')),
            'name' => fake()->words(2, true),
            'description' => fake()->optional()->sentence(),
            'step_order' => fake()->unique()->numberBetween(1, 200),
            'status' => fake()->boolean(90),
        ];
    }
}
