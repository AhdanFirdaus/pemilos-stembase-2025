<?php

namespace App\Http\Controllers;

use App\Models\PairCandidate;
use App\Models\Candidate;
use App\Services\CandidateService;
use App\Services\PairCandidateService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PairCandidateController extends Controller
{

    public function __construct(public CandidateService $candidate_service, public PairCandidateService $pair_candidate_service)
    {
        
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    $pairCandidates = PairCandidate::with(['leader', 'coLeader'])->get()->map(function ($pair) {
        return [
            'id' => $pair->id,
            'pair_number' => $pair->pair_number,
            'ketua' => $pair->leader->name,
            'wakil' => $pair->coLeader->name,
            'photo_path' => $pair->photo_path,
            'vision' => $pair->vision,
            'mission' => $pair->mission,
        ];
    });
    // dd($pairCandidates);
    return inertia('Admin/Paslon', [
        'pairCandidates' => $pairCandidates,
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
    // 2️⃣ Create leader and co-leader using CandidateService
    $leader = $this->candidate_service->create([
        'name' => $request->ketua_nama,
        'nis' => $request->ketua_nis,
        'kelas' => $request->ketua_kelas,
    ]);

    $coLeader = $this->candidate_service->create([
        'name' => $request->wakil_nama,
        'nis' => $request->wakil_nis,
        'kelas' => $request->wakil_kelas,
    ]);

    // 3️⃣ Handle photo upload
    $imageName = 'default.jpg';
    if ($request->hasFile('foto')) {
        $image = $request->file('foto');
        $randomName = Str::random(20).'.'.$image->getClientOriginalExtension();

        // simpan ke storage/app/public/image/paslon
        $image->storeAs('image/paslon', $randomName, 'public');

        // simpan path ke database
        $imageName = 'image/paslon/'.$randomName;

        // kalau butuh URL langsung:
        $imageUrl = asset('storage/'.$imageName);
    }
    
    // 4️⃣ Create pair candidate using PairCandidateService
    $this->pair_candidate_service->create([
        'leader_id' => $leader->id,
        'co_leader_id' => $coLeader->id,
        'photo_path' => $imageName,
        'vision' => $request->visi,
        'mission' => $request->misi,
        'pair_number' => $request->no_paslon,
    ]);

    return redirect()->back()->with('success', 'Pair Candidate successfully added!');
    }


    /**
     * Display the specified resource.
     */
    public function show(PairCandidate $pairCandidate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PairCandidate $pairCandidate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PairCandidate $pairCandidate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PairCandidate $pairCandidate)
    {
        //
    }
}
