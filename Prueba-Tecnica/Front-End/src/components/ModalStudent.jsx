import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { show_alerta } from '../functions';
export const ModalStudent = ( { title, setNombre, setApellido, setEdad, setEmail, handleClose, show
, id, nombre, apellido, edad, email, cursos_asociados, url, sendHttRequest, handleChange, selected}) => {

    const validar = ()=> {
        let parametros;
        let metodo;
        let urlSend;

        if (nombre === ''){
            show_alerta('escribe un nombre', 'warning');
        }
        else if(apellido === ''){
            show_alerta('escribe un apellido', 'warning');
        }
        else if(edad === ''){
            show_alerta('escribe una edad', 'warning');
        }
        else if (email === ''){
            show_alerta('escribe un email', 'warning')
        }
        else if (email === ''){
            show_alerta('escribe un email', 'warning')
        }
        else {
            if(title === 'Nuevo Estudiante'){
                urlSend= url;
                parametros = {
                    nombre: nombre, 
                    apellido: apellido, 
                    edad: edad,
                    email: email,
                    cursos_asociados: selected};
                metodo = 'POST';
            } else {
                urlSend = url+'/'+id;
                parametros = {
                    id: id,
                    nombre: nombre, 
                    apellido: apellido,
                    edad: edad,
                    email: email,
                    cursos_asociados: selected};
                metodo = 'PUT';
            }
        }
        //console.log("parametros antes de ser enviados:");
        //console.log(JSON.stringify(parametros));
		
        sendHttRequest(parametros, metodo, urlSend);
    }
        
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type='hidden' id='id' value={id}></input>
        <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-user-circle'></i></span>
            <input type='text' id='nombre' value={nombre} className='form-control' placeholder='Nombre' required 
            onChange={(e) => setNombre(e.target.value)}></input>
        </div>
        <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-user-circle'></i></span>
            <input type='text' id='apellido' className='form-control' required placeholder='Apellido' value={apellido} 
            onChange={(e) => setApellido(e.target.value)}></input>
        </div>
        <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-envelope-open'></i></span>
            <input type='email' id='email' className='form-control' required placeholder='Email' value={email} 
            onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-address-card'></i></span>
            <input type='edad' id='edad' className='form-control' required placeholder='edad' value={edad} 
            onChange={(e) => setEdad(e.target.value)}></input>
        </div>
        <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-university'></i></span>           
            <select className='form-control' value={selected} onChange={handleChange}>
                <option vale=''>--- selecionar un Curso que desee cursar ---</option>
                {cursos_asociados.map((course) =>
                <option key={course.id} value={course.id}>
                    {course.nombre}
                </option>
                )}
            </select>
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