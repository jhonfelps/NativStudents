<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseStudent;
use App\Http\Requests\StoreCourseStudentRequest;
use App\Http\Requests\CourseStudentRequest;
use App\Http\Resources\CourseStudentResource;
use App\Http\Requests\UpdateCourseStudentRequest;
use DB;

class CourseStudentiController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseStudentRequest $request)
    {
        $validatedData = $request->validated();
        if($validatedData) {
            $studentCourse = CourseStudent::create($request->all());
            return CourseStudentResource::make($studentCourse);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseStudentRequest $request, CourseStudent $courseStudent)
    {
        $validatedData = $request->validated();
        if($validatedData) {
            $courseStudent = DB::table('course_student')->where('student_id', $request->input('student_id'))
            ->update(['course_id' => $request->input('course_id')]);

            return CourseStudentResource::make($courseStudent);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CourseStudent $courseStudent)
    {
        //$student->delete();
        $courseStudent->delete();

        return response()->noContent();
    }
}
