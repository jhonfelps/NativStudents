import Button from 'react-bootstrap/Button';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
export const StudentItem = ( { student = {}, onOpenModal, setId, sendHttRequest, url, cursos_asociados = [], selected}) => {

    const deleteStudent = (id, nombre) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Esta seguro que desea eliminar el registro del estudiante ' + nombre + '?',
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
        <tr key={'trst'+ student.id}>
            <td key={'id'+ student.id}>{ (student.id) }</td>
            <td key={'nombre'+student.id}>{student.nombre}</td>
            <td key={'apellido'+student.id}>{student.apellido}</td>
            <td key={'email'+student.id}>{student.email}</td>
            <td key={'edad'+student.id}>{student.edad}</td>
            <td key={'cursos'+student.id}>
                {student.cursos_asociados.map((course) =>                    
                    <span>{course.nombre}</span>
                )}
            </td>
            <td>
                <Button variant="primary" id={'idShowModalButon'+ student.id} onClick={() => onOpenModal(2, student.id, student.nombre, student.apellido, student.email, student.edad, cursos_asociados, selected)} className='btn btn-dark'>
                    <i className='fa-solid fa-edit'></i>
                </Button>
                &nbsp;
                <button className='btn btn-danger' id={'idCloseModalButon'+ student.id} 
                onClick={() => deleteStudent(student.id, student.nombre)}>
                    <i className='fa-solid fa-trash'></i>
                </button>
            </td>   
        </tr>
        </>
    )
}