<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class BookSerie extends Model
{
    /** @use HasFactory<\Database\Factories\BookSerieFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'original_title',
        'author',
        'status',
    ];

    public function genres()
    {
        return $this->belongsToMany(BookGenre::class, 'bookserie_bookgenre', 'serie_id', 'genre_id');
    }

    public function books()
    {
        return $this->hasMany(Book::class, 'serie_id');
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

    protected static function booted()
    {
        static::saving(function ($serie) {
            if ($serie->isDirty('title')) {
                $serie->slug = Str::slug($serie->title) . '-' . Str::uuid();
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
