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
        Schema::create('votes', function (Blueprint $table) {
            $table->id();

            // Foreign key to voters table
            $table->unsignedBigInteger('voter_id');
            $table->foreign('voter_id')->references('id')->on('voters')->onDelete('cascade');

            // Foreign key to pair_candidates table
            $table->unsignedBigInteger('pair_candidate_id');
            $table->foreign('pair_candidate_id')->references('id')->on('pair_candidates')->onDelete('cascade');

            $table->timestamps();

            // Ensure one voter can only vote once
            $table->unique('voter_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};
