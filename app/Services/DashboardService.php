<?php

namespace App\Services;
use \App\Models\Candidate;
use App\Models\PairCandidate;

class DashboardService
{
    /**
     * Create a new class instance.
     */
    public function get_pair()
    {
        // Eager load related leader & co_leader data
        $pairs = PairCandidate::with(['leader', 'coLeader'])->get();

        // Map the pairs into your target JSON structure
        $data = $pairs->map(function ($pair) {
            // Clean up and split mission text into an array
            $missions = preg_split("/\r\n|\n|\r/", $pair->mission);
            $missions = array_filter(array_map(function ($line) {
                return trim(ltrim($line, '- ')); // remove leading '- ' and whitespace
            }, $missions));

            return [
                'id' => (int) $pair->id,
                'name' => 'Paslon ' . ucfirst($this->numberToWord($pair->pair_number)),
                'ketua' => $pair->leader->name ?? null,
                'wakil' => $pair->coLeader->name ?? null,
                'visi' => trim($pair->vision),
                'misi' => array_values($missions), // reindex numerically
            ];
        });

        return $data->toArray();
    }

    // Optional helper to convert numbers to words
    private function numberToWord($number)
    {
        $map = [
            1 => 'Satu',
            2 => 'Dua',
            3 => 'Tiga',
            4 => 'Empat',
            5 => 'Lima',
        ];

        return $map[$number] ?? $number;
    }
}
