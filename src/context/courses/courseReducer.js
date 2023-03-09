import {
    OBTENER_CURSOS,
    OBTENER_CURSOS_TRABAJOS,
    OBTENER_ESTUDIANTES_ACTIVIDAD,
    OBTENER_ENTREGADO_ESTUDIANTES
} from '../../types';

export default (state, action) => {

    switch (action.type) {
        case OBTENER_CURSOS:
            return {
                ...state,
                courses: action.payload
            }
        case OBTENER_CURSOS_TRABAJOS:
            return {
                ...state,
                coursesWorks: action.payload
            }
        case OBTENER_ESTUDIANTES_ACTIVIDAD:
            return {
                ...state,
                students: action.payload
            }
        case OBTENER_ENTREGADO_ESTUDIANTES:

            return {
                ...state,
                submissions: action.payload
            }
        default:
            return state;
    }
}