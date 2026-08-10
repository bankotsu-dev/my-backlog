<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameGenre;
use Illuminate\Http\Request;
use App\Http\Requests\StoreGameRequest;
use App\Http\Requests\UpdateGameRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->perPage ?? 10;

        $games = Game::where('user_id', auth()->user()->id)
        ->search($request->search)
        ->with('genres')
        ->orderBy('title', 'asc')
        ->paginate($perPage)
        ->withQueryString();

        return inertia('games/index', [
            'games' => $games,
            'gameGenres' => GameGenre::all(),
            'filters' => [
                'search' => $request->search,
                'perPage' => $perPage,    
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
    public function store(StoreGameRequest $request)
    {
        $request->validated();
        try {
            $game = Game::create($request->validated());
            $game->genres()->sync($request->genres);
            // Upload image to Backblaze
            if ($request->hasFile('cover_img')) {
                $uuid = (string) Str::uuid();
                $extension = $request->file('cover_img')->extension();
                $path = "games/". auth()->user()->id ."/{$uuid}.{$extension}";
                Storage::disk('b2')->put(
                    $path,
                    file_get_contents($request->file('cover_img')->getRealPath())
                );
                $game->update([
                    'cover_public_id' => $path,
                ]);
            }
            if ($request->hasFile('background_img')) {
                $uuid = (string) Str::uuid();
                $extension = $request->file('background_img')->extension();
                $path = "games/". auth()->user()->id ."/{$uuid}.{$extension}";
                Storage::disk('b2')->put(
                    $path,
                    file_get_contents($request->file('background_img')->getRealPath())
                );
                $game->update([
                    'background_public_id' => $path,
                ]);
            }
            // Save image url
            if ( $request->cover_url) { $game->update([ 'cover' => $request->cover_url ]); }
            if ( $request->background_url) { $game->update([ 'background_image' => $request->background_url ]); }
            
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
            'game' => $game->load('genres')->load('images'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Game $game)
    {
        if ($game->user_id !== auth()->user()->id) {
            return redirect()->route('games.index')->withError('error', 'You do not have permission to edit this game.');
        }
        return inertia('games/edit', [
            'game' => $game->load('genres'),
            'gameGenres' => GameGenre::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGameRequest $request, Game $game)
    {
        if ($game->user_id !== auth()->user()->id) {
            return redirect()->route('games.index')->withError('error', 'You do not have permission to edit this game.');
        }
        try {
            $game->update($request->all());
            $game->genres()->sync($request->genres);
            if( $request->updateCoverURL ) {
                if( $game->cover_public_id) {
                    Storage::disk('b2')->delete($game->cover_public_id);
                    $game->update([
                        'cover_public_id' => null
                    ]);
                }
                $game->update([
                    'cover' => $request->cover_url
                ]);
            }
            if( $request->updateBackgroundURL ) {
                if ($game->background_public_id) {
                    Storage::disk('b2')->delete($game->background_public_id);
                    $game->update([
                        'background_public_id' => null
                    ]);
                }
                $game->update([
                    'background_image' => $request->background_url
                ]);
            }
            if( $request->hasFile('cover_img') ){
                if( $game->cover_public_id) {
                    Storage::disk('b2')->delete($game->cover_public_id);
                }
                $uuid = (string) Str::uuid();
                $extension = $request->file('cover_img')->extension();
                $path = "games/". auth()->user()->id ."/{$uuid}.{$extension}";
                Storage::disk('b2')->put(
                    $path,
                    file_get_contents($request->file('cover_img')->getRealPath())
                );
                $game->update([
                    'cover_public_id' => $path,
                ]);
            }
            if ($request->hasFile('background_img')) {
                if ($game->background_public_id) {
                    Storage::disk('b2')->delete($game->background_public_id);
                }
                $uuid = (string) Str::uuid();
                $extension = $request->file('background_img')->extension();
                $path = "games/". auth()->user()->id ."/{$uuid}.{$extension}";
                Storage::disk('b2')->put(
                    $path,
                    file_get_contents($request->file('background_img')->getRealPath())
                );
                $game->update([
                    'background_public_id' => $path,
                ]);
            }
            return redirect()->route('games.index')->with('success', 'Game updated successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game)
    {
        if ($game->user_id !== auth()->user()->id) {
            return redirect()->route('games.index')->withError('error', 'You do not have permission to delete this game.');
        }
        try {
            if ($game->cover_public_id) {
                Storage::disk('b2')->delete($game->cover_public_id);
            }
            if ($game->background_public_id) {
                Storage::disk('b2')->delete($game->background_public_id);
            }
            $game->delete();
            return redirect()->route('games.index');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
        
    }
}
