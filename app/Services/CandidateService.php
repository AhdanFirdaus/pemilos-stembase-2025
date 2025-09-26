<?php

namespace App\Services;
use \App\Models\Candidate;

class CandidateService
{
    /**
     * Create a new class instance.
     */
    public function create(array $data): Candidate
    {
        return Candidate::create([
            'name' => $data['name'],
            'nis' => $data['nis'],
            'kelas' => $data['kelas'],
        ]);
    }
}
