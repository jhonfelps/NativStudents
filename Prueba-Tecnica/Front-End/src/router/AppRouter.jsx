import { Routes,Route } from "react-router-dom";
import ShowStudents from "./components/ShowStudents";
import ShowCourses from "../components/Courses/ShowCourses";

export const AppRouter = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={<ShowStudents></ShowStudents>}></Route>
            <Route path="courses" element={<ShowCourses></ShowCourses>}></Route>
        </Routes>
        </>
    )
}