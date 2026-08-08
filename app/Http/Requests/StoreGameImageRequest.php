<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreGameImageRequest extends FormRequest
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
            'game_id' => ['required', 'exists:games,id'],
            'source' => ['required', 'in:url,upload'],
            'url' => ['nullable','url', 'max:255', 'required_if:source,url'],
            'image' => ['nullable', 'image', 'max:1024', 'required_if:source,upload'],
        ];
    }
}
