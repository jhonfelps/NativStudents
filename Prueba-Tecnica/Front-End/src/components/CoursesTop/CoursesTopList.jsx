import { TopCourseItem } from './TopCourseItem';
export const CoursesTopList = ( { courses = [], onOpenCourseModal, handleClose, show, setId, sendHttRequest, url}) => {
    return (
    <tbody className='table-group-divider'>
        {courses.map( (course, i) => (
            <TopCourseItem
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