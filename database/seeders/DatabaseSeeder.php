<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        //\App\Models\Student::factory(10)->create();

        \App\Models\Student::factory(10)->create([
                 'nombre' => Str::random(5),
                 'apellido' => Str::random(8),
                 'email' => Str::random(4).'@gmail.com',
                 'edad' => 25,
                 'cursos_asociados' => Str::random(20).' curso.',
             ]);
    }
}
