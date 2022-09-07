<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Reply;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(3)->create()->each(function ($user) {
            $user->questions()
                ->saveMany(
                    Question::factory(rand(1, 7))->make()
                )
                ->each(function ($question) {
                    $question->replies()
                        ->saveMany(
                            Reply::factory(rand(1, 5))->make()
                        )->each(function ($reply) {
                            $reply->replies()
                                ->saveMany(
                                    Reply::factory(rand(1, 3))->make([
                                        'question_id' => $reply->question_id,
                                    ])
                                );
                        });
                });
        });
    }
}
