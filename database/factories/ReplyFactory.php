<?php

namespace Database\Factories;

use App\Models\Question;
use App\Models\Reply;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reply>
 */
class ReplyFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'question_id' => Question::factory(),
            'reply_id' => null,
            'content' => $this->faker->sentence(),
        ];
    }

    public function sub_reply()
    {
        return $this->state(function (array $attributes) {
            return [
                'reply_id' => Reply::factory(),
            ];
        });
    }
}
