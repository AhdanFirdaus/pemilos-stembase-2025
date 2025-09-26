<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PairCandidate extends Model
{
    protected $fillable = [
        'leader_id',
        'co_leader_id',
        'photo_path',
        'vision',
        'mission',
    ];
}
