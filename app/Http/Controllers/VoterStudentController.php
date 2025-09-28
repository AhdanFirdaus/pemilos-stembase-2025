<?php

namespace App\Http\Controllers;

use App\Exports\StudentExport;
use App\Imports\StudentImport;
use App\Models\Vote;
use App\Models\Voter;
use App\Services\VoterService;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;


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
        $students = Voter::where('tipe','siswa')->get();
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
        $student = $this->service->create_student([
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
    public function update(Request $request, Voter $siswa)
    {
        $siswa->name = $request->nama;
        $siswa->kelas = $request->kelas;
        $siswa->identifier = $request->nis;
        $siswa->save();
        return redirect()->route('adminsiswa.index')->with('success', 'Data siswa berhasil di modifikasi!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voter $siswa)
    {
        $siswa->delete();
        return redirect()->back()->with('success', 'Data siswa berhasil di hapus');
    }

    public function destroy_all()
    {
        $siswa = Voter::where('tipe','siswa')->delete();
        return redirect()->back()->with('success', 'Seluruh data siswa berhasil di hapus');
    }

    public function export_student() 
    {
        return Excel::download(new StudentExport, 'data-siswa.xlsx');
    }

    public function import_student(Request $request) {
        // dd($request->all());
        Excel::import(new StudentImport, $request->file('file'));

        return redirect()->route('adminsiswa.index')->with('success', 'Data siswa berhasil di impor');
    }
}
