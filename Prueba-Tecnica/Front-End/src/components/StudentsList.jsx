import { StudentItem } from './StudentItem';
export const StudentList = ( { students = [], onOpenModal, handleClose, show, setId, sendHttRequest, url, cursos_asociados = [], handleChange}) => {
    return (
    <tbody className='table-group-divider'>
        {students.map( (student, i) => (
            <StudentItem
                student = { student }                
                onOpenModal = { onOpenModal }
                handleClose = { handleClose }
                show = { show }
                setId = { setId }
                sendHttRequest = { sendHttRequest }
                url = { url }
                cursos_asociados = {cursos_asociados}
                handleChange = { handleChange }
            />
        ))
        }
    </tbody>
    )
}