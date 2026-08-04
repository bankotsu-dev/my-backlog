<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

}
