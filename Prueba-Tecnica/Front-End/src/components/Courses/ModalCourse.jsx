import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { show_alerta } from '../../functions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
export const ModalCourse = ( { title, setNombre, setHorario, setFechaInicio, setFechaFin, setNumeroEstudiantes, handleClose, show
, id, nombre, horario, fecha_inicio, fecha_fin, numero_estudiantes, url, sendHttRequest}) => {

    const validar = ()=> {
        let parametros;
        let metodo;
        let urlSend;

        if (nombre === ''){
            show_alerta('escribe un nombre', 'warning');
        }
        else if(horario === ''){
            show_alerta('escribe un horario', 'warning');
        }
        else if(fecha_inicio === ''){
            show_alerta('escribe una fecha inicio', 'warning');
        }
        else if (fecha_fin === ''){
            show_alerta('escribe una fecha fin', 'warning')
        }
        else if (numero_estudiantes === ''){
            show_alerta('escribe un número de estudiantes para el curso', 'warning')
        }
        else {
            if(title === 'Nuevo Curso'){
                urlSend= url;
                parametros = { 
                    nombre: nombre, 
                    horario: horario, 
                    fecha_inicio: fecha_inicio,
                    fecha_fin: fecha_fin,
                    numero_estudiantes: numero_estudiantes};
                metodo = 'POST';
            } else {
                urlSend = url+'/'+id;
                parametros = {
                    id: id,
                    nombre: nombre, 
                    horario: horario, 
                    fecha_inicio: fecha_inicio,
                    fecha_fin: fecha_fin,
                    numero_estudiantes: numero_estudiantes};
                metodo = 'PUT';
            }
        }
        sendHttRequest(parametros, metodo, urlSend);
    }
        
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type='hidden' id='id' value={id}></input>
        <label for="nombre">Nombre</label>
        <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-user-circle'></i></span>
            <input type='text' id='nombre' value={nombre} className='form-control' placeholder='Nombre' required 
            onChange={(e) => setNombre(e.target.value)}></input>
        </div>
        <label for="nombre">Horario</label>
        <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-hourglass-start'></i></span>
            <input type='text' className='form-control' required placeholder='Horario' value={horario} 
            onChange={(e) => setHorario(e.target.value)}></input>
        </div>
        <div className='input-group mb-3'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Fecha Inicio" defaultValue={dayjs(fecha_inicio)} 
                onChange={(newValue) => setFechaInicio(newValue)}/>
            </LocalizationProvider>
        </div>
        <div className='input-group mb-3'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Fecha Fin" defaultValue={dayjs(fecha_fin)} 
                onChange={(newValue) => setFechaFin(newValue)}/>
            </LocalizationProvider>
        </div>
        <label for="nombre">Número de Estudiantes</label>
        <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-users'></i></span>
            <input type='text' id='cursos_asociados' name='numero_estudiantes'
             className='form-control' placeholder='Número de Estudiantes'
              required value={numero_estudiantes}
            onChange={(e) => setNumeroEstudiantes(e.target.value)}></input>
        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" id='btnCerrar' onClick={handleClose}>
            Cerrar
            </Button>
            <Button variant="success" onClick={() => validar()}>
            Guardar <i className='fa-solid fa-floppy-disk'></i>
            </Button>
        </Modal.Footer>
    </Modal>
    )
}