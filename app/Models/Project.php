<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'code',
        'name',
        'description',
        'start_date',
        'end_date',
        'status',
        'notes',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'status' => 'boolean',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function partners()
    {
        return $this->belongsToMany(Partner::class, 'project_partners')
            ->withTimestamps();
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'project_users')
            ->withTimestamps();
    }
}
