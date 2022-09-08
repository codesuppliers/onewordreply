<?php

namespace App\Http\Controllers;

use App\Http\Actions\CreateGuestUser;
use App\Http\Resources\ReplyResource;
use App\Models\Question;

class ReplyController extends Controller
{
    public function index(Question $question)
    {
        return ReplyResource::collection($question->replies()->get());
    }

    public function store(Question $question, CreateGuestUser $createGuestUser)
    {
        request()->validate([
            'content' => 'required',
        ]);

        $reply = $question->replies()->create(
            array_merge(
                request()->only(['content', 'reply_id']),
                ['user_id' => $createGuestUser->handle()->id]
            )
        );

        return new ReplyResource($reply);
    }
}
