<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'code' => $this->code,
            'name' => $this->name,
            'description' => $this->description,
            'start_date' => $this->start_date?->format('Y-m-d'),
            'start_date_formatted' => $this->start_date?->format('m/d/Y'),
            'end_date' => $this->end_date?->format('Y-m-d'),
            'end_date_formatted' => $this->end_date?->format('m/d/Y'),
            'status' => $this->status,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
