<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\AuthController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group(['middleware' => ['api']], function () {
    Route::get('/recipe', [RecipeController::class, 'top']);
    Route::post('/recipe', [RecipeController::class, 'store']);
    Route::get('/recipe/detail/{id}', [RecipeController::class, 'show']);
    Route::get('/recipe/search/{title}', [RecipeController::class, 'search']);
    Route::get('/recipe/ranking', [RecipeController::class, 'ranking']);
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/user/recipe', [RecipeController::class, 'index']);
    Route::post('/user/recipe/store', [RecipeController::class, 'store']);
    Route::post('/user/recipe', [RecipeController::class, 'upload']);
    Route::get('/user/recipe/edit/{id}', [RecipeController::class, 'edit']);
    Route::put('/user/recipe/update', [RecipeController::class, 'update']);
    Route::delete('/user/recipe/delete', [RecipeController::class, 'delete']);
    Route::get('/user/recipe/favorite', [RecipeController::class, 'favorites']);
    Route::post('/user/recipe/favorite', [RecipeController::class, 'favorite']);
    Route::delete('/user/recipe/favorite', [RecipeController::class, 'unfavorite']);
});

Route::group([
    'middleware' => ['api'],
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/me', [AuthController::class, 'me']);
});
