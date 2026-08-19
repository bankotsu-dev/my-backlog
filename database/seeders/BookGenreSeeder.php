<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BookGenre;

class BookGenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BookGenre::insert([
            ['genre' => 'Fiction'],
            ['genre' => 'Non-Fiction'],
            ['genre' => 'Fantasy'],
            ['genre' => 'Dark Fantasy'],
            ['genre' => 'Grimdark'],
            ['genre' => 'Science Fiction'],
            ['genre' => 'Mystery'],
            ['genre' => 'Thriller'],
            ['genre' => 'Horror'],
            ['genre' => 'Romance'],
            ['genre' => 'Historical'],
            ['genre' => 'Adventure'],
            ['genre' => 'Crime'],
            ['genre' => 'Self-Help'],
            ['genre' => 'Horror'],
            ['genre' => 'Comics'],
            ['genre' => 'Western'],
            ['genre' => 'Erotic'],
            ['genre' => 'Light Novel'],
            ['genre' => 'Philosophy'],
            ['genre' => 'Psychology'],
            ['genre' => 'Visual Novel'],
            ['genre' => 'Politics'],
            ['genre' => 'Drama'],
            ['genre' => 'Humor'],
        ]);
    }
}
