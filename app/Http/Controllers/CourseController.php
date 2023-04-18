<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Carbon\Carbon;
use DB;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CourseResource::collection(Course::paginate(100));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $validatedData = $request->validated();
        if($validatedData) {
            $course = Course::create($request->all());
            return CourseResource::make($course);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        return CourseResource::make($course);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $validatedData = $request->validated();
        if($validatedData) {
            $course = Course::find($request->input('id'));
            $course->update($request->all());
            return CourseResource::make($course);
        }
    }

    /**
     * Display the specified resource.
     */
    public function showTopThree(Course $course)
    {
        $sixMounthsAgo= Carbon::now()->subMonths(6)->startOfDay()->toDateString();
        $currentDate = Carbon::now()->endOfDay()->toDateString();
        return DB::table('courses')
            ->select(['courses.id','courses.nombre','courses.horario','courses.fecha_inicio',
                    'courses.fecha_fin', DB::raw('SUM(courses.numero_estudiantes) as numero_estudiantes')])
            ->whereBetween('courses.fecha_fin', [$sixMounthsAgo, $currentDate])
            ->orwhereBetween('courses.fecha_inicio', [$sixMounthsAgo, $currentDate])
            ->groupBy('courses.nombre')
            ->orderBy('numero_estudiantes', 'desc')
            ->distinct()
            ->take(3)
            ->get();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return response()->noContent();
    }
}
