<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [RecipeController::class, 'top'])->name('top');
Route::get('/about', [RecipeController::class, 'about'])->name('about');
Route::get('/help', [RecipeController::class, 'help'])->name('help');
Route::get('/search', [RecipeController::class, 'search'])->name('search');
Route::get('/show/{id}', [RecipeController::class, 'show'])->name('show');
// Route::get('/search', [RecipeController::class, 'search'])->name('search');
Route::get('/ranking', [RecipeController::class, 'ranking'])->name('ranking');


Auth::routes();
Route::group(['middleware' => 'auth'], function () {
    Route::get('/user', [RecipeController::class, 'index'])->name('user.home');
    Route::get('/user/create', [RecipeController::class, 'create'])->name('user.create');
    Route::post('/user/store', [RecipeController::class, 'store'])->name('user.store');
    Route::get('/user/edit', [RecipeController::class, 'edit'])->name('user.edit');
    Route::post('/user/update', [RecipeController::class, 'update'])->name('user.update');
    Route::post('/user/delete/{id}', [RecipeController::class, 'delete'])->name('user.delete');
    Route::get('/user/account', [RecipeController::class, 'account'])->name('user.account');

    Route::get('/user/favorite', [UserController::class, 'favorite'])->name('user.favorite');

    Route::post('/user/favorire/store', [FavoriteController::class, 'store'])->name('user.favorite.store');

    Route::get('/user/menu', [RecipeController::class, 'menu'])->name('user.menu');
});
