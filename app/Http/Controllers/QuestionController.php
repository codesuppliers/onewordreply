<?php

namespace App\Http\Controllers;

use App\Http\Actions\CreateGuestUser;
use App\Http\Resources\QuestionResource;
use App\Models\Question;

class QuestionController extends Controller
{
    public function index()
    {
        return QuestionResource::collection(Question::orderByDesc('id')->paginate(10));
    }

    public function store(CreateGuestUser $createRandomUser)
    {
        request()->validate([
            'description' => 'required',
            'content' => 'required',
        ]);

        $question = Question::create(
            array_merge(
                request()->only(['content', 'description']),
                ['user_id' => $createRandomUser->handle()->id]
            )
        );

        return new QuestionResource($question);
    }
}
