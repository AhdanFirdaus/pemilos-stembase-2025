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

    public function update($paslon,$request) {
        // dd($request);
        $paslon->leader->name = $request->ketua_nama;
        $paslon->leader->kelas = $request->ketua_kelas;
        $paslon->leader->nis = $request->ketua_nis;
        $paslon->leader->save();
        $paslon->coLeader->name = $request->wakil_nama;
        $paslon->coLeader->kelas = $request->wakil_kelas;
        $paslon->coLeader->nis = $request->wakil_nis;
        $paslon->coLeader->save();
        $paslon->pair_number = $request->no_paslon;
        $paslon->vision = $request->visi;
        $paslon->mission = $request->misi;

        $paslon->save();
    }
}
