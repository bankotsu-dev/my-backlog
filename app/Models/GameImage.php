<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class GameImage extends Model
{
    protected $fillable = [
        'game_id',
        'source',
        'url',
        'path',
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    protected function url(): Attribute
    {
        return Attribute::make(
            get: function () {
                if( $this->path) {
                   return Storage::disk('b2')->temporaryUrl(
                        $this->path,
                        now()->addMinutes(5)
                    );
                }
                return $this->getRawOriginal('url');
            }
        );
    }
}
