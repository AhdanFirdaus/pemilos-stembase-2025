<?php

namespace App\Http\Middleware;

use App\Models\Vote;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PreventMultipleVotesOnlyHome
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // dd('tes');
        $voter = auth('voter')->user();
        // dd($voter);
        if (!$voter) {
            $voter = (object) [
        'id' => 999999,
        'name' => 'example',
    ];
        }
        $nama = $voter->name;
        // dd($voter->id);
        if (Vote::where('voter_id', $voter->id)->exists()) {
            Auth::guard('voter')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect()->route('index')->withErrors([
                'message' => "Akun $nama sudah melakukan voting!"
            ]);
        }
        return $next($request);
    }
}
