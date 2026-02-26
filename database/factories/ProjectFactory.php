<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Project::class;

    public function definition(): array
    {
        $start = fake()->optional()->dateTimeBetween('-6 months', '+1 month');
        $end = $start
            ? fake()->optional()->dateTimeBetween($start, '+12 months')
            : null;

        return [
            'name' => fake()->company(),
            'description' => fake()->optional()->sentence(),
            'start_date' => $start?->format('Y-m-d'),
            'end_date' => $end?->format('Y-m-d'),
            'status' => fake()->boolean(90),
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}
