<?php

namespace App\Http\Controllers;

use App\Models\Anime;
use App\Models\AnimeGenre;
use App\Models\Season;
use App\Http\Requests\StoreAnimeRequest;
use App\Http\Requests\UpdateAnimeRequest;
use Illuminate\Http\Request;
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
            'animes' => $animes,
            'genres' => AnimeGenre::all(),
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
        try {
            $anime = Anime::create($request->validated());
            $anime->genres()->sync($request->genres);
            if( $request->cover_type === 'url' && $request->url) {
                $anime->update([
                    'cover_type' => 'url',
                    'cover_url' => $request->url,
                ]);
            }
            if( $request->cover_type === 'upload' && $request->hasFile('image')) {
                $uuid = (string) Str::uuid();
                $extension = $request->file('image')->extension();
                $path = "animes/". auth()->user()->id ."/{$uuid}.{$extension}";
                Storage::disk('b2')->put(
                    $path,
                    file_get_contents($request->file('image')->getRealPath())
                );
                $anime->update([
                    'cover_type' => 'upload',
                    'cover_path' => $path,
                ]);
            }
            return back();
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Anime $anime)
    {
        return inertia('animes/show', [
            'anime' => $anime->load('genres')->load('seasons'),
            'genres' => AnimeGenre::all(),
        ]);
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
         try {
            $anime->update($request->validated());
            $anime->genres()->sync($request->genres);
            if($request->updateCoverUrl){
                if($anime->cover_type === 'upload' && $anime->cover_path) {
                    Storage::disk('b2')->delete($anime->cover_path);
                    $anime->update([
                        'cover_path' => null
                    ]);
                }
                $anime->update([
                    'cover_type' => 'url',
                    'cover_url' => $request->url,
                ]);
            }
            if($request->hasFile('image') && $request->img_type === 'upload') {
                $uuid = (string) Str::uuid();
                $extension = $request->file('image')->extension();
                $path = "animes/". auth()->user()->id ."/{$uuid}.{$extension}";
                Storage::disk('b2')->put(
                    $path,
                    file_get_contents($request->file('image')->getRealPath())
                );
                $anime->update([
                    'cover_type' => 'upload',
                    'cover_url' => null,
                    'cover_path' => $path,
                ]);
            }
            return back()->with('success', 'Anime updated successfully');
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anime $anime)
    {
        try {
            $seasons = Season::where('anime_id', $anime->id)->get();
            foreach ($seasons as $season) {
                if ($season->cover_path) {
                    Storage::disk('b2')->delete($season->cover_path);
                }
                $season->delete();
            }
            $anime->delete();
            return redirect()->route('animes.index');
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
    }
}
