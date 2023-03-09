import { useContext } from 'react';
import Logo from '../img/logo.png';


import AuthContext from "../context/authentication/authContext";
import CourseContext from "../context/courses/courseContext";

import { useParams } from 'react-router-dom';
import  clienteAxios from '../config/axios';
 
const AddFeedback = () => {
    
   

    const authContext = useContext(AuthContext);
    const { autenticado, usuario, rol, signIn, logOut, usuarioAutenticado, loginRol } = authContext;

    const courseContext = useContext(CourseContext);
    const { courses, coursesWorks, students, submissions, getCourses, getCourseWorks, getStudents, getSubmissions } = courseContext;

    let fortalezas = document.getElementById("fortalezas");
    let falencias  = document.getElementById("falencias");
    const { id } = useParams();
    let arrayId = id.split(".");
    let activityId = arrayId[0], courseId = arrayId[1], studentId = arrayId[2], ownerId = arrayId[3];
    let data = ({courseId: courseId, studentId: studentId, teacherId: ownerId, activityId: activityId, fortalezas: fortalezas, falencias: falencias });

    

    
    return (
        <div className="wrapper">
            <div className="box-log">
                <div className="header-form">
                    <div className="logo">
                        <figure>
                            <img src={Logo} alt="Logo" />
                        </figure>
                    </div>
                    <h1>Agregar retroalimentacion</h1>
                    <p>Rellena los datos mencionados en la tabla</p>
                </div>
                <form autoComplete="off">
                    <div className="box-log-input-group mb-2">
                        <label for="fortalezas">Fortalezas</label>
                        <textarea style={{borderRadius: 5}} type="text" placeholder="Fortalezas" id="fortalezas"></textarea>
                    </div>
                    <div className="box-log-input-group mb-2">
                        <label for="Falencias">Falencias</label>
                        <textarea style={{borderRadius: 5}} type="text" placeholder="Falencias" id="Falencias"></textarea>
                    </div>
                    <button className="btn btn-primary mb-2">Guardar</button>
                </form>
                <p id="alert"></p>
            </div>
        </div>
    );
}
export default AddFeedback;