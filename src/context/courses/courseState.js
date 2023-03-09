import React, { useReducer } from 'react';

import clienteAxios from '../../config/axios';

import CourseContext from './courseContext';
import CourseReducer from './courseReducer';

import {
    LOGIN_ROL,
    OBTENER_CURSOS,
    OBTENER_CURSOS_TRABAJOS,
    OBTENER_ESTUDIANTES_ACTIVIDAD,
    OBTENER_ENTREGADO_ESTUDIANTES
} from '../../types';

const AuthState = props => {

    const initialState = {
        courses: null,
        coursesWorks: null,
        students: null,
        submissions: null,
        activityId: null
    }

    const [state, dispatch] = useReducer(CourseReducer, initialState);

    const getSubmissions = students => {
        dispatch({
            type: OBTENER_ENTREGADO_ESTUDIANTES,
            payload: students
        })
    }

    const getStudents = students => {
        dispatch({
            type: OBTENER_ESTUDIANTES_ACTIVIDAD,
            payload: students
        })
    }

    const getCourseWorks = coursesWorks => {
        dispatch({
            type: OBTENER_CURSOS_TRABAJOS,
            payload: coursesWorks
        })
    }

    const getCourses = courses => {
        dispatch({
            type: OBTENER_CURSOS,
            payload: courses
        })
    }

    return (
        <CourseContext.Provider
            value={{
                courses: state.courses,
                coursesWorks: state.coursesWorks,
                students: state.students,
                submissions: state.submissions,
                activityId: state.activityId,
                getCourses,
                getCourseWorks,
                getStudents,
                getSubmissions
            }}
        >
            {props.children}
        </CourseContext.Provider>
    )
}

export default AuthState;