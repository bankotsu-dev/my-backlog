<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Builder;

class Anime extends Model
{
    /** @use HasFactory<\Database\Factories\AnimeFactory> */
    use HasFactory;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function genres()
    {
        return $this->belongsToMany(AnimeGenre::class, 'anime_animegenre', 'anime_id', 'genre_id');
    }

    public function seasons()
    {
        return $this->hasMany(Season::class);
    }

    public function scopeSearch(Builder $query, $value): void
    {
        if( $value) {
            $query->where('title', 'like', "%{$value}%")
            ->orWhere('original_title', 'like', "%{$value}%");
        }
    }
    
    public function scopeStatus(Builder $query, $value): void
    {
        if( $value) {
            $query->where('status', $value);
        }
    }

    protected function coverUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if($this->cover_path) {
                   return Storage::disk('b2')->temporaryUrl(
                        $this->cover_path,
                        now()->addMinutes(5)
                    );
                }
                return $this->getRawOriginal('cover_url');
            }
        );
    }
}
