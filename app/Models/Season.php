<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    /** @use HasFactory<\Database\Factories\SeasonFactory> */
    use HasFactory;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
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
