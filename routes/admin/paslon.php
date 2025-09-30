<?php

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\PairCandidateController;
use App\Models\Candidate;
use App\Models\PairCandidate;
use Illuminate\Support\Facades\Route;


Route::resource('paslon', PairCandidateController::class);