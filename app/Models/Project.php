<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'status'
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
