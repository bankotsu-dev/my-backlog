<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

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

}
