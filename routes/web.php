<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GameController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //Games
    Route::get('games', [\App\Http\Controllers\GameController::class, 'index'])->name('games.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
