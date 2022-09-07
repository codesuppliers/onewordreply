<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionResource;
use App\Models\Question;

class QuestionController extends Controller
{
    public function index()
    {
        return QuestionResource::collection(Question::orderByDesc('id')->paginate(10));
    }
}
