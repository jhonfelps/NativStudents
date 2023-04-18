import { CourseItem } from './CourseItem';
export const CoursesList = ( { courses = [], onOpenCourseModal, handleClose, show, setId, sendHttRequest, url}) => {
    return (
    <tbody className='table-group-divider'>
        {courses.map( (course, i) => (
            <CourseItem
                course = { course }
                onOpenCourseModal = { onOpenCourseModal }
                handleClose = { handleClose }
                show = { show }
                setId = { setId }
                sendHttRequest = { sendHttRequest }
                url = { url }
            />
        ))
        }
    </tbody>
    )
}