<?php

namespace App\Http\Actions;

use App\Models\User;

class CreateGuestUser
{
    public function handle()
    {
        $randomUser = $this->getRandomUser();

        return User::create([
            'name' => $randomUser['name'],
            'email' => $randomUser['email'],
            'password' => bcrypt($randomUser['password']),
        ]);
    }

    private function getRandomUser()
    {
        $faker = \Faker\Factory::create();

        return [
            'name' => $faker->firstName(),
            'email' => $faker->safeEmail(),
            'password' => 'password',
        ];
    }
}
