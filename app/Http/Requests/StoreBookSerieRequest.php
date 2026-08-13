<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookSerieRequest extends FormRequest
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
            'user_id' => ['required', 'exists:users,id'],
            'title' => ['required', 'max:255'],
            'original_title' => ['nullable', 'max:255'],
            'author' => ['nullable', 'max:255'],
            'status' => ['required', 'in:Backlog,Reading,Completed,Paused,Dropped'],
            'genres' => ['nullable', 'array', 'exists:book_genres,id'],
        ];
    }
}
