import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { StudentList } from './StudentsList';
import { ModalStudent } from './ModalStudent';
import { show_alerta } from '../functions';
import { Student } from './Student';
import { Course } from './Courses/Course';

const ShowStudents = () => {    
    const url="http://localhost/students-app/public/api/v1/students";
    const urlCourses="http://localhost/students-app/public/api/v1/courses";
    const urlCourseStudent = "http://localhost/students-app/public/api/v1/coursestudent";
    const options = [{value: '', text: '--Choose an option--'}];
    const [selected, setSelectedCourse] = useState(options[0].value);
    const handleChange = event => { setSelectedCourse(event.target.value) };
    const [students, setStudents] = useState([]);
    const [cursos_asociados, setCursosAsociados] = useState([]);
    const [show, setShow] = useState(false);    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [email, setEmail] = useState('');
    const [title,setTitle]= useState('');
    let params;

    useEffect( ()=> {
        getStudents();
    }, [Student]);

    const getStudents = async () => {
        const respuesta = await axios.get(url);
        const estudiantes = [];
        respuesta.data.data.forEach( doc => {
            estudiantes.push({ id: doc.id, nombre: doc.nombre, apellido:doc.apellido,
                edad: doc.edad ,email: doc.email, cursos_asociados:doc.cursos_asociados});
        });
        setStudents(estudiantes);
    }

    useEffect( ()=> {
        getCourses();
    }, [Course]);

    const getCourses = async () => {
        const respuest = await axios.get(urlCourses);
        const cursitos = [];
        respuest.data.data.forEach( doc => {
            cursitos.push({ id: doc.id, nombre: doc.nombre, 
                horario: doc.horario , fecha_inicio: doc.fecha_inicio, 
                fecha_fin:doc.fecha_fin, numero_estudiantes:doc.numero_estudiantes });
        });

        setCursosAsociados(cursitos);
    }

    const onOpenModal = (op, id, nombre, apellido, email, edad, cursos_asociados) => {
        setShow(true);        
        if(op === 1){
            setId('');
            setNombre('');
            setApellido('');
            setEdad('');
            setEmail('');
            setCursosAsociados(cursos_asociados);
            setSelectedCourse(cursos_asociados);
            setTitle('Nuevo Estudiante');
        } else {
            setId(id);
            setNombre(nombre);
            setApellido(apellido);
            setEdad(edad);
            setEmail(email);
            setSelectedCourse(cursos_asociados);
            setCursosAsociados(cursos_asociados);
            setTitle('Editar Estudiante');
        }
        window.setTimeout(function(){
            document.getElementById('nombre').focus();
        }, 500);
    }   

    const sendHttRequest = async(parametros, metodo, urlSend) => {
        await axios( {method: metodo, url: urlSend, data: parametros}).then(function(response){             
            if(metodo === 'POST'){         
                params = { student_id: response.data.data.id, course_id: parametros.cursos_asociados};
                saveCourseStudent(params, 'POST', urlCourseStudent);                
                show_alerta('Muy bien insertado exitosamente!', 'success');
                document.getElementById('btnCerrar').click();
            }
            else if(metodo === 'PUT'){
                params = { student_id: parametros.id, course_id: parametros.cursos_asociados};
                saveCourseStudent(params, 'PUT', urlCourseStudent + '/' + parametros.id);
                show_alerta('Muy bien actualizado exitosamente!', 'success');
                document.getElementById('btnCerrar').click();
            }
            else {
                show_alerta('Muy bien registro eliminado con éxito!', 'success');
            }
            getStudents();
        })
        .catch(function(err){
            show_alerta('Error en la solicitud', 'error');
            console.log(err);
        });
    }

    const saveCourseStudent = async(params, metodo, urlCourseStudent) => {  
        await axios( {method: metodo, url: urlCourseStudent, data: params}).then(function(response){
            getStudents();
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
                    <Button variant="primary" onClick={() => onOpenModal(1, null, null, null, null, null, cursos_asociados)} className='btn btn-rounded btn-primary'>
                        Agregar Estudiante
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
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Edad</th>
                                    <th>Cursos</th>
                                </tr>
                            </thead>
                            <StudentList
                                students={ students }
                                cursos_asociados ={ cursos_asociados }
                                onOpenModal= { onOpenModal }
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
        <ModalStudent    
            title = { title }
            setNombre = { setNombre }
            setApellido = { setApellido }
            setEdad = { setEdad }
            setEmail = { setEmail }
            setCursosAsociados = { setCursosAsociados }            
            handleClose = { handleClose }
            show = { show }
            id = { id }  
            nombre = { nombre }
            apellido = { apellido }
            edad = { edad }
            email = { email }
            cursos_asociados = { cursos_asociados }            
            url = {url}
            sendHttRequest = { sendHttRequest }
            handleChange = { handleChange }
            selected = { selected }
        ></ModalStudent>
    </div>
    </>    
  );
}

export default ShowStudents;