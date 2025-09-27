<?php

namespace App\Services;
use \App\Models\PairCandidate;

class PairCandidateService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create(array $data): PairCandidate
    {
        return PairCandidate::create([
            'leader_id' => $data['leader_id'],
            'co_leader_id' => $data['co_leader_id'],
            'photo_path' => $data['photo_path'],
            'vision' => $data['vision'],
            'mission' => $data['mission'],
            'pair_number' => $data['pair_number'],
        ]);
    }
}
