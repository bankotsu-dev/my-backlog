<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class Game extends Model
{
    /** @use HasFactory<\Database\Factories\GameFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'status',
        'description',
        'notes',
        'cover',
        'cover_public_id',
        'background_image',
        'background_public_id',
        'developer',
        'publisher',
        'rating',
        'hg',
        'version',
    ];

    public function genres()
    {
        return $this->belongsToMany(GameGenre::class, 'game_gamegenre', 'game_id', 'genre_id');
    }

    public function images()
    {
        return $this->hasMany(GameImage::class);
    }

    protected function cover(): Attribute
    {
        return Attribute::make(
            get: function () {
                if( $this->cover_public_id) {
                   return Storage::disk('b2')->temporaryUrl(
                        $this->cover_public_id,
                        now()->addMinutes(5)
                    );
                }
                return $this->getRawOriginal('cover');
            }
        );
    }

    protected function backgroundImage(): Attribute
    {
        return Attribute::make(
            get: function () {
                if( $this->background_public_id) {
                   return Storage::disk('b2')->temporaryUrl(
                        $this->background_public_id,
                        now()->addMinutes(5)
                    );
                }
                return $this->getRawOriginal('background_image');
            }
        );
    }

}
