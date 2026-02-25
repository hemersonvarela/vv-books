<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionCategory extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionCategoryFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['name', 'code', 'type']; // income | expense

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'category_id');
    }



}
