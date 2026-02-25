<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contractor extends Model
{
    /** @use HasFactory<\Database\Factories\ContractorFactory> */
    use HasFactory;

    protected $fillable = ['name', 'email', 'phone'];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

}
