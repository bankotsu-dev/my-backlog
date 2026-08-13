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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('serie_id');
            $table->foreign('serie_id')->references('id')->on('book_series')->onDelete('cascade');
            $table->string('title');
            $table->string('original_title')->nullable();
            $table->string('status');
            $table->integer('last_page')->nullable();
            $table->enum('type', ['main', 'prequel', 'sequel', 'spin-off'])->default('main');
            $table->integer('order')->default(1);
            $table->string('cover_type')->nullable();
            $table->string('cover_url')->nullable();
            $table->string('cover_path')->nullable();
            $table->unsignedTinyInteger('rating')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
