<?php
namespace App\Services;

use App\Models\PairCandidate;
use App\Models\Vote;
use App\Models\Voter;

class VoteService {
    public function get_all() {
    $total = Voter::count(); // Get total number of voters
    $voted = Voter::where('status', 'sudah')->count(); // Get number of voters who have voted
    $not_voted = Voter::where('status', 'belum')->count(); // Get number of voters who have not voted
    
    return [
        'total' => $total,
        'voted' => $voted,
        'not_voted' => $not_voted
    ];
    }

    public function get_student() {
    $total = Voter::where('tipe', 'siswa')->count();
    $voted = Voter::where('status', 'sudah')->where('tipe', 'siswa')->count();
    $not_voted = Voter::where('status', 'belum')->where('tipe', 'siswa')->count();
    
    return [
        'total' => $total,
        'voted' => $voted,
        'not_voted' => $not_voted
        ];
    }

    public function get_teacher() {
    $total = Voter::where('tipe', 'guru')->count();
    $voted = Voter::where('status', 'sudah')->where('tipe', 'guru')->count();
    $not_voted = Voter::where('status', 'belum')->where('tipe', 'guru')->count();
    
    return [
        'total' => $total,
        'voted' => $voted,
        'not_voted' => $not_voted
        ];
    }

    public function generate_bar_data($role)
{
    $tipe = $role;
    $candidates = \App\Models\PairCandidate::all();

    // If role is 'all', count all votes
    if ($tipe === 'all') {
        return $candidates->map(function ($candidate) {
            $count = \App\Models\Vote::where('pair_candidate_id', $candidate->id)->count();

            return [
                'name' => 'Paslon ' . $candidate->pair_number,
                'value' => $count,
            ];
        })->values()->toArray();
    }

    // Otherwise, count only votes where Voter->tipe == $tipe
    $votesPerCandidate = \App\Models\Vote::whereHas('voter', function ($query) use ($tipe) {
        $query->where('tipe', $tipe);
    })
    ->selectRaw('pair_candidate_id, COUNT(*) as total')
    ->groupBy('pair_candidate_id')
    ->pluck('total', 'pair_candidate_id'); 
    // 👆 gives key-value pairs like [candidate_id => total_votes]

    // Map all candidates, including those with 0 votes
    return $candidates->map(function ($candidate) use ($votesPerCandidate) {
        $count = $votesPerCandidate[$candidate->id] ?? 0; // default 0 if no votes
        return [
            'name' => 'Paslon ' . $candidate->pair_number,
            'value' => $count,
        ];
    })->values()->toArray();
}

    /**
     * Generate pie chart data (voted vs not voted) as percentages.
     */
    public function generate_pie_data(array $total)
    {
        $totalVoters = $total['total'] ?? 0;
        $voted = $total['voted'] ?? 0;
        $notVoted = $total['not_voted'] ?? 0;
        // dd($total);
        return [
            [
                'name' => 'Sudah Memilih',
                'value' => $totalVoters > 0 ? round(($voted / $totalVoters) * 100, 2) : 0,
                'color' => '#A3E4D7',
            ],
            [
                'name' => 'Belum Memilih',
                'value' => $totalVoters > 0 ? round(($notVoted / $totalVoters) * 100, 2) : 0,
                'color' => '#F5B7B1',
            ],
        ];
    }

}
