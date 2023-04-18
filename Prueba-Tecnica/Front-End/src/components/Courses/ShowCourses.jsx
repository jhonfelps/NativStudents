import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { CoursesList } from './CoursesList';
import { ModalCourse } from './ModalCourse';
import { show_alerta } from '../../functions';

const ShowCourses = () => {
    const url="http://localhost/students-app/public/api/v1/courses";
    const [courses, setCourses] = useState([]);
    const [show, setShow] = useState(false);    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [horario, setHorario] = useState('');
    const [fecha_inicio, setFechaInicio] = useState('');
    const [fecha_fin, setFechaFin] = useState('');
    const [numero_estudiantes, setNumeroEstudiantes] = useState('');
    const [title,setTitle]= useState('');

    useEffect( ()=> {
        getCourses();
    }, []);

    const getCourses = async () => {
        const respuesta = await axios.get(url);
        setCourses(respuesta.data.data);
    }

    const onOpenCourseModal = (op, id, nombre, horario, fecha_inicio, fecha_fin, numero_estudiantes) => {
        setShow(true);        
        if(op === 1){
            setId('');
            setNombre('');
            setHorario('');
            setFechaInicio('');
            setFechaFin('');
            setNumeroEstudiantes('');
            setTitle('Nuevo Curso');
        } else {
            setId(id);
            setNombre(nombre);
            setHorario(horario);
            setFechaInicio(fecha_inicio);
            setFechaFin(fecha_fin);
            setNumeroEstudiantes(numero_estudiantes);
            setTitle('Editar Curso');
        }
        window.setTimeout(function(){
            document.getElementById('nombre').focus();
        }, 500);
    }   

    const sendHttRequest = async(parametros, metodo, urlSend) => {
        await axios( {method: metodo, url: urlSend, data: parametros}).then(function(response){
            if(metodo !== 'DELETE'){
                show_alerta('Muy bien, curso almacenado exitosamente!', 'success');
                document.getElementById('btnCerrar').click();
            } else {
                show_alerta('Muy bien el curso fue eliminado con éxito!', 'success');
            }
            getCourses();
        })
        .catch(function(err){
            show_alerta('Error en la solicitud', 'error');
            console.log(err);
        });
    }
    
  return (
    <>
    <div className='App'>
        <div className='container my-3 wrap'>
            <div className='row mt-3'>
                <div className='col-md-2'>
                    <div className='float-right'>
                    <Button variant="primary" onClick={() => onOpenCourseModal(1)} className='btn btn-primary'>
                        Añadir Curso
                    </Button>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className=''>
                    <div className='tabl-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Horario</th>
                                    <th>Fecha Inicio</th>
                                    <th>Fecha Fin</th>
                                    <th>Número de Estudiantes</th>
                                </tr>
                            </thead>
                            <CoursesList
                                courses ={ courses }
                                onOpenCourseModal= { onOpenCourseModal }
                                handleClose = { handleClose }
                                handleShow = { handleShow }
                                show = { show }
                                setId = { setId }
                                sendHttRequest = { sendHttRequest }
                                url = { url }
                            />
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <ModalCourse    
            title = { title }
            setNombre = { setNombre }
            setHorario = { setHorario }
            setFechaInicio = { setFechaInicio }
            setFechaFin = { setFechaFin }
            setNumeroEstudiantes = { setNumeroEstudiantes }            
            handleClose = { handleClose }
            show = { show }
            id = { id }  
            nombre = { nombre }
            horario = { horario }
            fecha_inicio = { fecha_inicio }
            fecha_fin = { fecha_fin }
            numero_estudiantes = { numero_estudiantes }            
            url = {url}
            sendHttRequest = { sendHttRequest }
        ></ModalCourse>
    </div>
    </>    
  );
}

export default ShowCourses;