<?php

namespace App\Http\Controllers;

use App\Models\Season;
use App\Http\Requests\StoreSeasonRequest;
use App\Http\Requests\UpdateSeasonRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SeasonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreSeasonRequest $request)
    {
        try {
            $season = Season::create($request->validated());
            if( $request->img_type === 'upload' && $request->hasFile('image')) {
                $uuid = (string) Str::uuid();
                $extension = $request->file('image')->extension();
                $path = "animes/". auth()->user()->id ."/{$uuid}.{$extension}";
                Storage::disk('b2')->put(
                    $path,
                    file_get_contents($request->file('image')->getRealPath())
                );
                $season->update([
                    'cover_type' => 'upload',
                    'cover_path' => $path,
                ]);
            }
            if( $request->img_type === 'url' && $request->url) {
                $season->update([
                    'cover_type' => 'url',
                    'cover_url' => $request->url,
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
    public function show(Season $season)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Season $season)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSeasonRequest $request, Season $season)
    {
        try {
            $season->update($request->validated());
            if($request->updateCoverUrl){
                if($season->cover_type === 'upload' && $season->cover_path) {
                    Storage::disk('b2')->delete($season->cover_path);
                    $season->update([
                        'cover_path' => null
                    ]);
                }
                $season->update([
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
                $season->update([
                    'cover_type' => 'upload',
                    'cover_url' => null,
                    'cover_path' => $path,
                ]);
            }
            return back()->with('success', 'Season updated successfully');
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Season $season)
    {
        try {
            if($season->cover_path) {
                Storage::disk('b2')->delete($season->cover_path);
            }
            $season->delete();
            return back();
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
    }
}
