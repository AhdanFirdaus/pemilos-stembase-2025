<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Voter;
use App\Models\Vote;
use App\Models\PairCandidate;

class VotesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pairCandidate = PairCandidate::first();

        if (!$pairCandidate) {
            $this->command->warn('No pair candidates found. Skipping vote seeding.');
            return;
        }

        Voter::all()->each(function ($voter) use ($pairCandidate) {
            Vote::create([
                'voter_id' => $voter->id,
                'pair_candidate_id' => $pairCandidate->id,
            ]);

            // Update voter status setelah melakukan vote
            $voter->update([
                'status' => 'sudah',
            ]);
        });
    }
}
