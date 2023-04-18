import { Course } from './Courses/Course';
export class Student{
    constructor(id,nombre, apellido, email, edad, courses) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.edad = edad;
      this.courses = courses;
    }
}