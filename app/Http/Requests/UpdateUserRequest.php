<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $userId = $this->route('user') ? $this->route('user')->id : null;

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', "unique:users,email,{$userId}"],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'project_ids' => ['nullable', 'array'],
            'project_ids.*' => ['exists:projects,id'],
        ];
    }
}
