<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectStep extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectStepFactory> */
    use HasFactory;

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

}
