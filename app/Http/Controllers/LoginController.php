<?php

namespace App\Http\Controllers;

use App\Models\Voter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::guard('voter')->check()) {
            return redirect('/');
        }
        return inertia('Auth/Login');
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
        $credentials = [
            'identifier' => $request->input('identifier'),
            'password' => $request->input('password'),
        ];

        if (Auth::guard('voter')->attempt($credentials)) {
            $request->session()->regenerate();
            // $voter = Auth::guard('voter')->user();

            // dd($voter);
            return redirect()->intended('/');
        }

        return back()->withErrors([
            'identifier' => 'Invalid credentials.',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Voter $voter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voter $voter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voter $voter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voter $voter)
    {
        //
    }

    public function get_admin() {
        if (auth('web')->check()) {
            return redirect()->intended('/admin/dashboard');
        }
        return inertia('Admin/Login');
    }

    public function admin(Request $request) {
        $credentials = [
            'email' => $request->input('username'),
            'password' => $request->input('password'),
        ];
        if (Auth::guard('web')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/admin/dashboard');
        }
        return back()->withErrors([
            'identifier' => 'Invalid credentials.',
        ]);
    }

    public function logout_admin(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/auth/admin/login');
    }
}
