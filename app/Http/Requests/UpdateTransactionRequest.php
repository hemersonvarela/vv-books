<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'project_id' => ['required', 'exists:projects,id'],
            'project_step_id' => ['required', 'exists:project_steps,id'],
            'partner_id' => ['nullable', 'exists:partners,id'],
            'contractor_id' => ['nullable', 'exists:contractors,id'],
            'vendor_id' => ['nullable', 'exists:vendors,id'],
            'category_id' => ['required', 'exists:transaction_categories,id'],
            'payment_method_id' => ['required', 'exists:payment_methods,id'],
            'date' => ['required', 'date'],
            'amount' => ['required', 'numeric', 'min:0'],
            'type' => ['required', Rule::in(['income', 'expense'])],
            'description' => ['required', 'string', 'max:255'],
            'reference' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
