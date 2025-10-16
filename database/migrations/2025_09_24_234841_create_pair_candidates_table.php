<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pair_candidates', function (Blueprint $table) {
            $table->id();
            // Foreign key for leader
            $table->unsignedBigInteger('leader_id');
            $table->foreign('leader_id')->references('id')->on('candidates')->onDelete('cascade');
            
            // Foreign key for co-leader
            $table->unsignedBigInteger('co_leader_id');
            $table->foreign('co_leader_id')->references('id')->on('candidates')->onDelete('cascade');
            $table->string('photo_path');
            $table->string('pair_number');
            $table->text('vision');
            $table->text('mission');
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pair_candidates');
    }
};
