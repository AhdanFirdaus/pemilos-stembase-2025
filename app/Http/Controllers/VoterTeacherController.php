<?php

namespace App\Http\Controllers;

use App\Exports\TeachertExport;
use App\Imports\TeacherImport;
use App\Models\Voter;
use App\Services\VoterService;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class VoterTeacherController extends Controller
{
    public function __construct(public VoterService $service)
    {
        
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Voter::where('tipe','guru');

        if ($search = $request->search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('identifier', 'like', "%{$search}%")
                ->orWhere('status', 'like', "%{$search}%");
            });
        }

        $teachers = $query->get();

        return inertia('Admin/Teacher', [
            'teachers' => $teachers,
            'filters' => $request->only(['search'])
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
        $student = $this->service->create_teacher([
            'nama' => $request->nama,
            'nip' => $request->nip,
        ]);
        return redirect()->route('adminguru.index')->with('success', 'Data guru berhasil ditambahkan');
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
    public function update(Request $request, Voter $guru)
    {
        $guru->name = $request->nama;
        $guru->identifier = $request->nip;
        $guru->save();
        return redirect()->route('adminguru.index')->with('success', 'Data guru berhasil di modifikasi!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voter $guru)
    {
        $guru->delete();
        return redirect()->back()->with('success', 'Data guru berhasil di hapus');
    }

    public function destroy_all()
    {
        $guru = Voter::where('tipe', 'guru')->delete();
        return redirect()->back()->with('success', 'Semua data guru berhasil di hapus');
    }

    public function export_teacher() 
    {
        return Excel::download(new TeachertExport, 'data-guru.xlsx');
    }

    public function import_teacher(Request $request) {
        // dd($request->all());
        Excel::import(new TeacherImport, $request->file('file'));

        return redirect()->route('adminguru.index')->with('success', 'Data guru berhasil di impor');
    }
}
