<?php

namespace App\Http\Controllers;

use App\Models\Anime;
use App\Models\BookSerie;
use App\Models\Game;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('dashboard', [
            'animes' => Anime::where('status', 'Watching')->limit(5)->latest('updated_at')->get(),
            'series' => BookSerie::where('status', 'Reading')->limit(5)->latest('updated_at')->get(),
            'games' => Game::where('status', 'Playing')->limit(5)->latest('updated_at')->get(),
        ]);
    }
}
