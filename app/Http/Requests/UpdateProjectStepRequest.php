<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectStepRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $projectStep = $this->route('project_step');

        return [
            'code' => ['required', 'string', 'max:3', 'unique:project_steps,code,'.$projectStep->id],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'step_order' => ['required', 'integer', 'unique:project_steps,step_order,'.$projectStep->id],
            'status' => ['required', 'boolean'],
        ];
    }
}
