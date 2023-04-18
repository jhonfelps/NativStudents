import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { CoursesTopList } from './CoursesTopList';
const TopThreeCourses = () => {
    const url="http://localhost/students-app/public/api/v1/topthreecourses";
    const [courses, setCourses] = useState([]);
    const [show, setShow] = useState(false);    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [id, setId] = useState('');

    useEffect( ()=> {
        getCourses();
    }, []);

    const getCourses = async () => {
        const respuesta = await axios.get(url);
        setCourses(respuesta.data);
    }

  return (
    <>
    <div className='App'>
        <div className='container my-3 wrap'>
            <h2 className='text-center'>Top 3 de los Cursos con más Estudiantes en los últimos 6 Meses:</h2>
            <div className='row mt-3'>
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid mx-auto'>
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
                            <CoursesTopList
                                courses ={ courses }
                                handleClose = { handleClose }
                                handleShow = { handleShow }
                                show = { show }
                                setId = { setId }
                                url = { url }
                            />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>    
  );
}

export default TopThreeCourses;