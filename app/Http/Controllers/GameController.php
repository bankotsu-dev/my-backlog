<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameGenre;
use App\Http\Requests\StoreGameRequest;
use App\Http\Requests\UpdateGameRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('games/index', [
            'games' => Game::where('user_id', auth()->user()->id)->with('genres')->get(),
            'gameGenres' => GameGenre::all(),
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
    public function store(StoreGameRequest $request)
    {
        try {
            $game = Game::create($request->validated());
            $game->genres()->sync($request->genres);
            // Upload image to Cloudinary
            $cover = null;
            if ($request->hasFile('cover_img')) {
                $cover = Cloudinary::uploadApi()->upload($request->file('cover_img')->getRealPath(), 
                ['folder' => 'backlist/'. $request->user()->id .'/games',]);
                $game->update([
                    'cover' => $cover['secure_url'] ?? null,
                    'cover_public_id' => $cover['public_id'] ?? null,
                ]);
            }
            $background = null;
            if ($request->hasFile('background_img')) {
                $background = Cloudinary::uploadApi()->upload($request->file('background_img')->getRealPath(), 
                ['folder' => 'backlist/'. $request->user()->id .'/games',]);
                $game->update([
                    'background_image' => $background['secure_url'] ?? null,
                    'background_public_id' => $background['public_id'] ?? null,
                ]);
            }
            if($request->cover_url) {
                $game->update([
                    'cover' => $request->cover_url
                ]);
            }
            if($request->background_url) {
                $game->update([
                    'background_image' => $request->background_url
                ]);
            }
            return redirect()->route('games.index')->with('success', 'Game created successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game)
    {
        if ($game->user_id !== auth()->user()->id) {
            return redirect()->route('games.index')->withError('error', 'You do not have permission to view this game.');
        }
        return inertia('games/show', [
            'game' => $game->load('genres')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Game $game)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGameRequest $request, Game $game)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game)
    {
        try {
            if ($game->user_id !== auth()->user()->id) {
                return redirect()->route('games.index')->withError('error', 'You do not have permission to delete this game.');
            }
            if ($game->cover_public_id) {
                Cloudinary::uploadApi()->destroy($game->cover_public_id);
            }
            if ($game->background_public_id) {
                Cloudinary::uploadApi()->destroy($game->background_public_id);
            }
            $game->delete();
            return redirect()->route('games.index');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
        
    }
}
