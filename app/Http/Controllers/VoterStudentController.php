<?php

namespace App\Http\Controllers;

use App\Models\Voter;
use App\Services\VoterService;
use Illuminate\Http\Request;

class VoterStudentController extends Controller
{

    public function __construct(public VoterService $service)
    {
        
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Voter::all()->where('tipe','siswa');
        return inertia('Admin/Student', [
            'students' => $students
        ]);
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
        $student = $this->service->create([
            'nama' => $request->nama,
            'nis' => $request->nis,
            'kelas' => $request->kelas,
        ]);
        return redirect()->back()->with('success', 'Siswa berhasil ditambahkan!');
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
}
