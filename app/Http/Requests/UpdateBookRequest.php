<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
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
            'status' => ['required', 'in:Backlog,Reading,Completed,Paused,Dropped'],
            'last_page' => ['nullable', 'integer', 'min:0'],
            'type' => ['required', 'in:main,prequel,sequel,spin-off'],
            'order' => ['required', 'integer', 'min:1'],
            'img_type' => ['nullable', 'in:url,upload'],
            'url' => ['nullable', 'url', 'max:64000'],
            'image' => ['nullable', 'image', 'max:1024'],
            'rating' => ['nullable', 'integer', 'min:0', 'max:5'],
            'notes' => ['nullable', 'max:64000'],
            'updateCoverUrl' => ['nullable', 'boolean'],
        ];
    }
}
