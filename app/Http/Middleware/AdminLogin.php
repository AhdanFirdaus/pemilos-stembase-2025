<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $admin = auth('web')->user();
        if (!$admin) {
            return redirect()->route('authloginadminindex')->withErrors([
                'messages' => 'You are not admin yet'
            ]);
        }
        return $next($request);
    }
}
