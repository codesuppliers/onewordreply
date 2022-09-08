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
        $response = json_decode(file_get_contents('https://randomuser.me/api/?inc=name,email&nat=us'), true);

        return [
            'name' => $response['results'][0]['name']['first'],
            'email' => $response['results'][0]['email'],
            'password' => 'password',
        ];
    }
}
