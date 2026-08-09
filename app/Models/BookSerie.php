<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookSerie extends Model
{
    /** @use HasFactory<\Database\Factories\BookSerieFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'original_title',
        'author',
        'status',
    ];
}
