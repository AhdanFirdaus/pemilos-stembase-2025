<?php

namespace App\Http\Controllers;

use App\Models\PairCandidate;
use App\Models\Vote;
use App\Models\Voter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VotingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $voter_id = auth('voter')->user()->id;
        if (Vote::where('voter_id',$voter_id)->exists()) {
            return redirect()->route('authlogin.index')->withErrors(['message' => 'You already voter!!!']);
        }
        return inertia('Votes/Votes');
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
        $pair_candidate_id = $request->input('candidate_id');
        // dd(auth('vot ->user()->id);
        $voter_id = auth('voter')->user()->id;
        if (!PairCandidate::where('id',$pair_candidate_id)) {
            dd('success');
            return back()->withErrors(['message' => 'The candidate you vote not exist!']);
        }
        if (Vote::where('voter_id',$voter_id)->exists()) {
            return back()->withErrors(['message' => 'You already voter!!!']);
        }
        Vote::create([
            'voter_id' => $voter_id,
            'pair_candidate_id' => $pair_candidate_id,
            'status' => 'sudah'
        ]);
        $voter = Voter::findOrFail($voter_id);
        $voter->status = 'sudah';
        $voter->save();
        return redirect()->route('authlogin.index')->with('message', 'Vote submitted successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Vote $vote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vote $vote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vote $vote)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vote $vote)
    {
        //
    }
}
