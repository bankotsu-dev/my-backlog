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
            $table->text('status');
            $table->integer('last_page')->nullable();
            $table->enum('type', ['main', 'precuel', 'sequel', 'spin-off'])->default('main');
            $table->integer('order')->default(1);
            $table->text('cover_type')->nullable();
            $table->text('cover_url')->nullable();
            $table->text('cover_path')->nullable();
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
