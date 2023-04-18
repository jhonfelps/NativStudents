import Button from 'react-bootstrap/Button';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
export const CourseItem = ( { course = {}, onOpenCourseModal, setId, sendHttRequest, url}) => {

    const deleteCourse = (id, nombre) => {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: '¿Esta seguro que desea eliminar el registro del curso ' + nombre + '?',
            icon: 'question', text: 'No se podrá deshacer la operación',
            showCancelButton:true, confirmButtonText:'Si, Eliminar Registro', cancelButtonText:'Cancelar'
        }).then((result) => {
            if (result.isConfirmed){
                setId(id);
                sendHttRequest({id:id},'DELETE', url+'/'+id);
            }
        })
    }
    return (
        <>
        <tr key={'tr'+ course.id}>
            <td key={'id'+ course.id}>{ (course.id) }</td>
            <td key={'nombre'+course.id}>{course.nombre}</td>
            <td key={'horario'+course.id}>{course.horario}</td>
            <td key={'fecha_inicio'+course.id}>{course.fecha_inicio}</td>
            <td key={'fecha_fin'+course.id}>{course.fecha_fin}</td>
            <td key={'numero_estudiantes'+course.id}>{course.numero_estudiantes}</td>
            <td>
                <Button variant="primary" id={'idShowModalButon'+ course.id} onClick={() => onOpenCourseModal(2, course.id, course.nombre, course.horario, course.fecha_inicio, course.fecha_fin, course.numero_estudiantes)} className='btn btn-dark'>
                    <i className='fa-solid fa-edit'></i>
                </Button>
                &nbsp;
                <button className='btn btn-danger' id={'idCloseModalButon'+ course.id} 
                onClick={() => deleteCourse(course.id, course.nombre)}>
                    <i className='fa-solid fa-trash'></i>
                </button>
            </td>   
        </tr>
        </>
    )
}