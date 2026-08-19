<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AnimeGenre;

class AnimeGenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AnimeGenre::insert([
            ['genre' => 'Action'],
            ['genre' => 'Adventure'],
            ['genre' => 'Cars'],
            ['genre' => 'Comedy'],
            ['genre' => 'Crime'],
            ['genre' => 'Demons'],
            ['genre' => 'Drama'],
            ['genre' => 'Ecchi'],
            ['genre' => 'Fantasy'],
            ['genre' => 'Games'],
            ['genre' => 'Gore'],
            ['genre' => 'Harem'],
            ['genre' => 'Hentai'],
            ['genre' => 'Historical'],
            ['genre' => 'Horror'],
            ['genre' => 'Isekai'],
            ['genre' => 'Magic'],
            ['genre' => 'Martial Arts'],
            ['genre' => 'Mecha'],
            ['genre' => 'Military'],
            ['genre' => 'Music'],
            ['genre' => 'Mystery'],
            ['genre' => 'Parody'],
            ['genre' => 'Psychological'],
            ['genre' => 'Romance'],
            ['genre' => 'Samurai'],
            ['genre' => 'School'],
            ['genre' => 'Sci-Fi'],
            ['genre' => 'Seinen'],
            ['genre' => 'Shoujo'],
            ['genre' => 'Shounen'],
            ['genre' => 'Slice of Life'],
            ['genre' => 'Space'],
            ['genre' => 'Sports'],
            ['genre' => 'Supernatural'],
            ['genre' => 'Super Power'],
            ['genre' => 'Thriller'],
            ['genre' => 'Vampire'],
            ['genre' => 'Yuri'],
        ]);
    }
}
