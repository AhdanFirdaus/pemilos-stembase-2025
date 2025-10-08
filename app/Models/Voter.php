<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voter extends Model
{
    protected $fillable = [
        'name',
        'identifier',
        'kelas',
        'tipe',
        'status',
        'password'
    ];
}
