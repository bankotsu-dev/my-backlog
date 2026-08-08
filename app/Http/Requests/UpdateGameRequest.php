<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateGameRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
            'status' => 'required|in:Backlog,Playing,Completed,Paused,Dropped',
            'description' => 'nullable|max:64000',
            'notes' => 'nullable|max:64000',
            'cover_img' => 'nullable|image|max:1024',
            'cover_url' => 'nullable|url|max:255',
            'background_img' => 'nullable|image|max:1024',
            'background_url' => 'nullable|url|max:255',
            'developer' => 'nullable|max:255',
            'publisher' => 'nullable|max:255',
            'rating' => 'nullable|integer|min:0|max:5',
            'hg' => 'required|boolean',
            'version' => 'nullable|max:50',
            'genres' => 'nullable|array|exists:game_genres,id',
            'updateCoverURL' => 'nullable|boolean',
            'updateBackgroundURL' => 'nullable|boolean',
        ];
    }
}
