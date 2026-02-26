<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionCategoryRequest extends FormRequest
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
        $transactionCategory = $this->route('transaction_category');

        return [
            'code' => [
                'required',
                'string',
                'size:3',
                'unique:transaction_categories,code,'.($transactionCategory->id ?? $transactionCategory),
            ],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:income,expense'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
