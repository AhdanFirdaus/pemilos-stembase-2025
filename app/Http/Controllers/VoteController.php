<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Services\VoteService;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function __construct(public VoteService $service)
    {
        
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $total = $this->service->get_all();
        $siswa = $this->service->get_student();
        $guru = $this->service->get_teacher();
        $pieDataTotal = $this->service->generate_pie_data($total);
        $barDataTotal = $this->service->generate_bar_data('all');
        $pieDataSiswa = $this->service->generate_pie_data($siswa);
        $barDataSiswa = $this->service->generate_bar_data('siswa');
        $pieDataGuru = $this->service->generate_pie_data($guru);
        $barDataGuru = $this->service->generate_bar_data('guru');
        // dd($barDataGuru);
        $datas = [
            "total" => [
                'total' => $total,
                'pieData' => $pieDataTotal,
                'barData' => $barDataTotal,
            ],
            "siswa" => [
                'siswa' => $siswa,
                'pieData' => $pieDataSiswa,
                'barData' => $barDataSiswa,
            ],
            "guru" => [
                'guru' => $guru,
                'pieData' => $pieDataGuru,
                'barData' => $barDataGuru,
            ],
        ];
        return inertia('Admin/Dashboard',[
            'datas' => $datas
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Vote $vote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vote $vote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vote $vote)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vote $vote)
    {
        //
    }
}
