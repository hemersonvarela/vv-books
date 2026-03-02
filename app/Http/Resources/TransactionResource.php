<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'project_id' => $this->project_id,
            'project' => $this->project?->name,
            'project_code' => $this->project?->code,
            'project_step_id' => $this->project_step_id,
            'step' => $this->step?->name,
            'step_code' => $this->step?->code,
            'partner_id' => $this->partner_id,
            'partner' => $this->partner?->name,
            'contractor_id' => $this->contractor_id,
            'contractor' => $this->contractor?->name,
            'vendor_id' => $this->vendor_id,
            'vendor' => $this->vendor?->name,
            'category_id' => $this->category_id,
            'category' => $this->category?->name,
            'payment_method_id' => $this->payment_method_id,
            'payment_method' => $this->paymentMethod?->name,
            'code' => $this->code,
            'date' => $this->date?->format('Y-m-d'),
            'date_formatted' => $this->date?->format('m/d/Y'),
            'amount' => $this->amount,
            'amount_formatted' => number_format($this->amount, 2),
            'type' => $this->type,
            'description' => $this->description,
            'reference' => $this->reference,
            'notes' => $this->notes,
            'verified_at' => $this->verified_at?->format('Y-m-d'),
            'verified_at_formatted' => $this->verified_at?->format('m/d/Y'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
