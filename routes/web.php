<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AnimeController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookSerieController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GameImageController;
use App\Http\Controllers\SeasonController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    //Animes
    Route::get('animes', [AnimeController::class, 'index'])->name('animes.index');
    Route::post('animes', [AnimeController::class, 'store'])->name('animes.store');
    Route::get('animes/{anime}', [AnimeController::class, 'show'])->name('animes.show');
    Route::put('animes/{anime}', [AnimeController::class, 'update'])->name('animes.update');
    Route::delete('animes/{anime}', [AnimeController::class, 'destroy'])->name('animes.destroy');

    //Seasons
    Route::post('seasons', [SeasonController::class, 'store'])->name('seasons.store');
    Route::put('seasons/{season}', [SeasonController::class, 'update'])->name('seasons.update');
    Route::delete('seasons/{season}', [SeasonController::class, 'destroy'])->name('seasons.destroy');

    //Series
    Route::get('books', [\App\Http\Controllers\BookSerieController::class, 'index'])->name('books.index');
    Route::get('books/{serie}', [\App\Http\Controllers\BookSerieController::class, 'show'])->name('books.show');
    Route::post('books/serie', [\App\Http\Controllers\BookSerieController::class, 'store'])->name('books-series.store');
    Route::put('books/serie/{serie}', [\App\Http\Controllers\BookSerieController::class, 'update'])->name('books-series.update');
    Route::delete('books/serie/{serie}', [\App\Http\Controllers\BookSerieController::class, 'destroy'])->name('books-series.destroy');

    //Books
    Route::post('books', [\App\Http\Controllers\BookController::class, 'store'])->name('books.store');
    Route::put('books/{book}', [\App\Http\Controllers\BookController::class, 'update'])->name('books.update');
    Route::delete('books/{book}', [\App\Http\Controllers\BookController::class, 'destroy'])->name('books.destroy');

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

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
