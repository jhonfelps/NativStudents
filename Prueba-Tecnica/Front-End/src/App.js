import { BrowserRouter, Routes, Route } from "react-router-dom";
import  ShowStudents from "./components/ShowStudents";
import ShowCourses from "./components/Courses/ShowCourses";
import { Navbar } from "./components/ui/Navbar";
import TopThreeCourses from "./components/CoursesTop/TopthreeCourses";
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<ShowStudents></ShowStudents>}></Route>
        <Route path="courses" element={<ShowCourses></ShowCourses>}></Route>
        <Route path="coursestopthree" element={<TopThreeCourses></TopThreeCourses>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
