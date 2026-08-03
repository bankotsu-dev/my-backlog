<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('status');
            $table->text('description')->nullable();
            $table->text('notes')->nullable();
            $table->string('cover')->nullable();
            $table->string('cover_public_id')->nullable();
            $table->string('background_image')->nullable();
            $table->string('background_public_id')->nullable();
            $table->string('developer')->nullable();
            $table->string('publisher')->nullable();
            $table->integer('rating')->nullable();
            $table->boolean('hg')->default(false);
            $table->string('version')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
