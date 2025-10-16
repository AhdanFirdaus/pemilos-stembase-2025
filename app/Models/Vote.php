<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = [
        'pair_candidate_id',
        'voter_id',
    ];
    public function pair() {
        return $this->belongsTo(Voter::class,'pair_candidate_id');
    }

    public function voter() {
        return $this->belongsTo(Voter::class, 'voter_id');
    }
}
