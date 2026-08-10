<?php

namespace Database\Factories;

use App\Models\Game;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'title' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['Backlog', 'Playing', 'Completed', 'Paused', 'Dropped']),
            'description' => $this->faker->text(),
            'rating' => $this->faker->numberBetween(1, 5),
            'hg' => $this->faker->randomElement([true, false]),
            'developer' => $this->faker->company(),
        ];
    }
}
