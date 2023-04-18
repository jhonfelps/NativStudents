<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;


class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return StudentResource::collection(Student::with('courses')->paginate(100));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $validatedData = $request->validated();
        if($validatedData) {
            $student = Student::create($request->all());
            return StudentResource::make($student);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return StudentResource::make($student);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $validatedData = $request->validated();
        if($validatedData) {
            $student = Student::find($request->input('id'));
            $student->update($request->all());
            return StudentResource::make($student);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->courses()->detach();
        $student->delete();

        return response()->noContent();
    }
}
