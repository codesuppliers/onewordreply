<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReplyResource;
use App\Models\Question;

class ReplyController extends Controller
{
    public function index(Question $question)
    {
        return ReplyResource::collection($question->replies()->get());
    }
}
