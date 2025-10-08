<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PairCandidate extends Model
{
    protected $fillable = [
        'leader_id',
        'co_leader_id',
        'photo_path',
        'pair_number',
        'vision',
        'mission',
    ];

    public function leader() {
        return $this->belongsTo(Candidate::class,'leader_id');
    }

    public function coLeader() {
        return $this->belongsTo(Candidate::class, 'co_leader_id');
    }
}
