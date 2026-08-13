<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GameImageController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookSerieController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //Games
    Route::get('games', [\App\Http\Controllers\GameController::class, 'index'])->name('games.index');
    Route::post('games', [\App\Http\Controllers\GameController::class, 'store'])->name('games.store');
    Route::get('games/{game}', [\App\Http\Controllers\GameController::class, 'show'])->name('games.show');
    Route::delete('games/{game}', [\App\Http\Controllers\GameController::class, 'destroy'])->name('games.destroy');
    Route::get('games/edit/{game}', [\App\Http\Controllers\GameController::class, 'edit'])->name('games.edit');
    Route::put('games/{game}', [\App\Http\Controllers\GameController::class, 'update'])->name('games.update');

    //GameImages
    Route::post('games/images', [\App\Http\Controllers\GameImageController::class, 'store'])->name('game-images.store');
    Route::delete('games/images/{gameImage}', [\App\Http\Controllers\GameImageController::class, 'destroy'])->name('game-images.destroy');

    //Books
    Route::get('books', [\App\Http\Controllers\BookSerieController::class, 'index'])->name('books.index');
    Route::get('books/{bookSerie}', [\App\Http\Controllers\BookSerieController::class, 'show'])->name('books.show');
    Route::post('books', [\App\Http\Controllers\BookSerieController::class, 'store'])->name('books-series.store');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
