<?php

namespace App\Http\Controllers;

use App\Models\GameImage;
use App\Http\Requests\StoreGameImageRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class GameImageController extends Controller
{
    public function store(StoreGameImageRequest $request)
    {
        try {
            if(  $request->source === 'upload' && $request->hasFile('image')) {
                $uuid = (string) Str::uuid();
                $extension = $request->file('image')->extension();
                $path = "games/". auth()->user()->id ."/{$uuid}.{$extension}";
                Storage::disk('b2')->put(
                    $path,
                    file_get_contents($request->file('image')->getRealPath())
                );
                GameImage::create([
                    'game_id' => $request->game_id,
                    'source' => $request->source,
                    'url' => $request->url,
                    'path' => $path
                ]);
            }
            if( $request->source === 'url' && $request->url) {
                GameImage::create([
                    'game_id' => $request->game_id,
                    'source' => $request->source,
                    'url' => $request->url
                ]);
            }
            return back();
        }catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
    }

    public function destroy(GameImage $gameImage)
    {
        try{
            if( $gameImage->source === 'upload') {
                Storage::disk('b2')->delete($gameImage->path);
            }
            $gameImage->delete();
            return back();
        }catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
    }
}
