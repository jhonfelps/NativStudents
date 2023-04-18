export const TopCourseItem = ( { course = {}, onOpenCourseModal, setId, sendHttRequest, url}) => {
    return (
        <>
        <tr key={'tr'+ course.id}>
            <td key={'id'+ course.id}>{ (course.id) }</td>
            <td key={'nombre'+course.id}>{course.nombre}</td>
            <td key={'horario'+course.id}>{course.horario}</td>
            <td key={'fecha_inicio'+course.id}>{course.fecha_inicio}</td>
            <td key={'fecha_fin'+course.id}>{course.fecha_fin}</td>
            <td key={'numero_estudiantes'+course.id}>{course.numero_estudiantes}</td>
        </tr>
        </>
    )
}