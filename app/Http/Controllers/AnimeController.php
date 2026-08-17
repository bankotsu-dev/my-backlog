<?php

namespace App\Http\Controllers;

use App\Models\Anime;
use App\Http\Requests\StoreAnimeRequest;
use App\Http\Requests\UpdateAnimeRequest;
use Illuminate\Http\Request;
use App\Models\AnimeGenre;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AnimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->perPage ?? 10;

        $animes = Anime::where('user_id', auth()->user()->id)
        ->search($request->search)
        ->status($request->status)
        ->with('genres')
        ->orderBy('title', 'asc')
        ->paginate($perPage)
        ->withQueryString();

        return inertia('animes/index', [
            'games' => $games,
            'animeGenres' => AnimeGenre::all(),
            'filters' => [
                'search' => $request->search,
                'perPage' => $perPage,    
                'status' => $request->status,    
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnimeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Anime $anime)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Anime $anime)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnimeRequest $request, Anime $anime)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anime $anime)
    {
        //
    }
}
