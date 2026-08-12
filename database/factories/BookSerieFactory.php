<?php

namespace Database\Factories;

use App\Models\BookSerie;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BookSerie>
 */
class BookSerieFactory extends Factory
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
            'original_title' => $this->faker->sentence(),
            'author' => $this->faker->name(),
            'status' => $this->faker->randomElement(['Backlog', 'Reading', 'Completed', 'Paused', 'Dropped']),
        ];
    }
}
