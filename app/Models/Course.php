<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $fillable = ['id','nombre','horario','fecha_inicio','fecha_fin','numero_estudiantes'];
    public function students(){
        return $this->belongsToMany(Student::class);
    }
}
