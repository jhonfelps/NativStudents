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
        Schema::create('course_student', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')
            ->nullable()
            ->constrained(('students'))
            ->cascadeOnUpdate()
            ->nullableOnDelete();

            $table->foreignId('course_id')
            ->nullable()
            ->constrained(('courses'))
            ->cascadeOnUpdate()
            ->nullableOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_student');
    }
};
