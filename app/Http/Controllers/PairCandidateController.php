<?php

namespace App\Http\Controllers;

use App\Models\PairCandidate;
use App\Services\CandidateService;
use App\Services\PairCandidateService;
use Illuminate\Http\Request;

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
        return inertia('Admin/Paslon');
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
        dd($request->all());
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
