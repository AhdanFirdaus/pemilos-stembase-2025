<?php

namespace App\Http\Middleware;

use App\Models\Vote;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PreventMultipleVotes
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $voter = auth('voter')->user();
        // If not logged in, redirect to login
        // dd('tes');
        if (!$voter) {
            return redirect()->route('authlogin.index')->withErrors([
                'messages' => 'You Have already voted!'
            ]);
        }
        
        // Check if already voted
        if (Vote::where('voter_id', $voter->id)->exists()) {
            Auth::guard('voter')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect()->route('authlogin.index')->withErrors([
                'message' => 'You have already voted!'
            ]);
        }

        return $next($request);
    }
}
