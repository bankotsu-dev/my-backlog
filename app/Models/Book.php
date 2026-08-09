<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];
}
