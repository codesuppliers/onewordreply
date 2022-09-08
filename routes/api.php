<?php

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ReplyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/questions', [QuestionController::class, 'index']);
Route::post('/questions', [QuestionController::class, 'store']);
Route::get('/replies/{question}', [ReplyController::class, 'index']);
Route::post('/replies/{question}', [ReplyController::class, 'store']);
