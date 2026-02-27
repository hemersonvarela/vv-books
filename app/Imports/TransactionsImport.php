<?php

namespace App\Imports;

use App\Models\PaymentMethod;
use App\Models\Project;
use App\Models\ProjectStep;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class TransactionsImport implements SkipsEmptyRows, ToModel, WithHeadingRow, WithValidation
{
    private array $projects;

    private array $steps;

    private array $categories;

    private array $paymentMethods;

    public function __construct()
    {
        $this->projects = Project::pluck('id', 'code')->toArray();
        $this->steps = ProjectStep::pluck('id', 'code')->toArray();
        $this->categories = TransactionCategory::pluck('id', 'code')->toArray();
        $this->paymentMethods = PaymentMethod::whereIn('name', [
            'Check', 'Bank Transfer', 'Credit Card', 'Cash', 'Zelle',
        ])->pluck('id', 'name')->toArray();
    }

    public function model(array $row): ?Transaction
    {
        $amount = $this->sanitizeAmount($row['amount']);

        return new Transaction([
            'date' => $this->transformDate($row['date']),
            'description' => $row['description'],
            'amount' => $amount,
            'project_id' => $this->projects[strtoupper($row['project'])],
            'project_step_id' => $this->steps[strtoupper($row['project_step'])],
            'category_id' => $this->categories[strtoupper($row['transaction_category'])],
            'payment_method_id' => $this->paymentMethods[$row['payment_method']],
            'reference' => $row['reference'] ?? null,
            'type' => $amount >= 0 ? 'income' : 'expense',
            'code' => 'T'.strtoupper(bin2hex(random_bytes(4))), // 9 characters, fits in 10
        ]);
    }

    public function rules(): array
    {
        return [
            'date' => ['required'],
            'description' => ['required', 'string'],
            'amount' => ['required'],
            'project' => ['required', 'string', 'min:1', 'max:3', function ($attribute, $value, $fail) {
                if (! isset($this->projects[strtoupper($value)])) {
                    $fail("Project code '{$value}' not found.");
                }
            }],
            'project_step' => ['required', 'string', 'min:1', 'max:3', function ($attribute, $value, $fail) {
                if (! isset($this->steps[strtoupper($value)])) {
                    $fail("Project step code '{$value}' not found.");
                }
            }],
            'transaction_category' => ['required', 'string', 'min:1', 'max:3', function ($attribute, $value, $fail) {
                if (! isset($this->categories[strtoupper($value)])) {
                    $fail("Transaction category code '{$value}' not found.");
                }
            }],
            'payment_method' => ['required', Rule::in(['Check', 'Bank Transfer', 'Credit Card', 'Cash', 'Zelle']), function ($attribute, $value, $fail) {
                if (! isset($this->paymentMethods[$value])) {
                    $fail("Payment method '{$value}' not found in database.");
                }
            }],
            'reference' => ['nullable'],
        ];
    }

    private function sanitizeAmount($value): float
    {
        if (is_numeric($value)) {
            return (float) $value;
        }

        $value = str_replace(['$', ','], '', $value);

        return (float) $value;
    }

    private function transformDate($value)
    {
        if (is_numeric($value)) {
            return \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($value);
        }

        try {
            return \Carbon\Carbon::parse($value);
        } catch (\Exception $e) {
            return $value;
        }
    }
}
