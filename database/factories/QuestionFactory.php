<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'content' => $this->faker->sentence(),
            'description' => $this->faker->sentence(),
        ];
    }
}
