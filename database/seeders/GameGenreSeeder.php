<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GameGenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('game_genres')->insert([
            ['genre' => 'Action'],
            ['genre' => 'Adventure'],
            ['genre' => 'Card Game'],
            ['genre' => 'RPG'],
            ['genre' => 'RTS'],
            ['genre' => 'Strategy'],
            ['genre' => 'Simulator'],
            ['genre' => 'Puzzle'],
            ['genre' => 'Shooter'],
            ['genre' => 'Fighting'],
            ['genre' => 'Racing'],
            ['genre' => 'Platformer'],
            ['genre' => 'Horror'],
            ['genre' => 'MMO'],
            ['genre' => 'Survival'],
            ['genre' => 'Stealth'],
            ['genre' => 'Rhythm'],
            ['genre' => 'Party'],
            ['genre' => 'Turn-based'],
            ['genre' => 'Visual Novel'],
            ['genre' => 'Beat em up'],
        ]);
    }
}
