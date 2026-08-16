<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class Book extends Model
{
    /** @use HasFactory<\Database\Factories\BookFactory> */
    use HasFactory;

    protected $fillable = [
        'serie_id',
        'title',
        'original_title',
        'status',
        'last_page',
        'type',
        'order',
        'cover_type',
        'cover_url',
        'cover_path',
        'rating',
        'notes',
    ];

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
