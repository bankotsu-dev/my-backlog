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
        'background_image',
        'developer',
        'publisher',
        'rating',
        'hg',
        'version',
    ];

}
