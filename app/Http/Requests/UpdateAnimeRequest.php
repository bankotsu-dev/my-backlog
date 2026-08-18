<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAnimeRequest extends FormRequest
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
            'title' => ['required', 'max:255'],
            'original_title' => ['nullable', 'max:255'],
            'status' => ['required', 'in:Backlog,Watching,Completed,Paused,Dropped'],
            'description' => ['nullable', 'max:64000'],
            'img_type' => ['nullable', 'in:url,upload'],
            'url' => ['nullable', 'url', 'max:255'],
            'image' => ['nullable', 'image', 'max:1024'],
            'rating' => ['nullable', 'integer', 'min:0', 'max:5'],
            'genres' => ['nullable', 'array', 'exists:anime_genres,id'],
            'updateCoverUrl' => ['nullable', 'boolean'],
        ];
    }
}
