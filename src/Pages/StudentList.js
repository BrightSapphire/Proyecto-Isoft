import { useContext, useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
import Isotipo from "../img/isotipo.png";

import { gapi } from 'gapi-script';
import { useParams } from "react-router-dom";

import AuthContext from "../context/authentication/authContext";
import CourseContext from "../context/courses/courseContext";
import { Link } from "react-router-dom";

const StudentList = () => {
    const authContext = useContext(AuthContext);
    const { autenticado, usuario, rol, signIn, logOut, usuarioAutenticado, loginRol } = authContext;

    const courseContext = useContext(CourseContext);
    const { courses, coursesWorks, students, submissions, getCourses, getCourseWorks, getStudents, getSubmissions } = courseContext;

    let studentlist;
    let studentSubmissions;

    let client_id = global.clientId;
    let scope = [
        'https://www.googleapis.com/auth/classroom.announcements',
        'https://www.googleapis.com/auth/classroom.announcements.readonly',
        'https://www.googleapis.com/auth/classroom.courses',
        'https://www.googleapis.com/auth/classroom.courses.readonly',
        'https://www.googleapis.com/auth/classroom.coursework.me',
        'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
        'https://www.googleapis.com/auth/classroom.coursework.students',
        'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
        'https://www.googleapis.com/auth/classroom.courseworkmaterials',
        'https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly',
        'https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly',
        'https://www.googleapis.com/auth/classroom.guardianlinks.students',
        'https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly',
        'https://www.googleapis.com/auth/classroom.profile.emails',
        'https://www.googleapis.com/auth/classroom.profile.photos',
        'https://www.googleapis.com/auth/classroom.push-notifications',
        'https://www.googleapis.com/auth/classroom.rosters',
        'https://www.googleapis.com/auth/classroom.rosters.readonly',
        'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
        'https://www.googleapis.com/auth/classroom.student-submissions.students.readonly',
        'https://www.googleapis.com/auth/classroom.topics',
        'https://www.googleapis.com/auth/classroom.topics.readonly',
    ],
        inmediate = true;
    const { id } = useParams();
    let arrayId = id.split(".");
    let activityId = arrayId[0], courseId = arrayId[1], ownerId = arrayId[2];

    useEffect(() => {
        const classroomStart = () => {
            gapi.client.load('classroom', 'v1', () => {
                gapi.auth.authorize(
                    { client_id: client_id, scope: scope, immediate: inmediate },
                    authResult => {
                        if (authResult && !authResult.error) {
                            const studentsCall = async () => {
                                studentlist = await gapi.client.classroom.courses.students.list({ courseId: courseId });
                                getStudents(studentlist.result.students);
                            }
                            studentsCall();
                        } else {
                            console.log("waaaaa")
                        }
                    }
                )
            });
        }
        gapi.load('client', classroomStart);
    }, []);

    useEffect(() => {
        const classroomStart = () => {
            gapi.client.load('classroom', 'v1', () => {
                gapi.auth.authorize(
                    { client_id: client_id, scope: scope, immediate: inmediate },
                    authResult => {
                        if (authResult && !authResult.error) {
                            const studentsCall = async () => {
                                studentSubmissions = await gapi.client.classroom.courses.courseWork.studentSubmissions.list({ courseId: courseId, courseWorkId: activityId })
                                // console.log(studentSubmissions)
                                getSubmissions(studentSubmissions.result.studentSubmissions);
                            }
                            studentsCall();
                        } else {
                            console.log("waaaaa")
                        }
                    }
                )
            });
        }
        gapi.load('client', classroomStart);
    }, [studentSubmissions]);


    return (
        <>
            <header>
                <nav>
                    <div>
                        <Link to={'/'}>
                            <img src={Isotipo} width="55" />
                        </Link>
                    </div>
                    <div>
                        <GoogleLogout
                            clientId={global.clientId}
                            buttonText="Cerrar Sesion"
                            onLogoutSuccess={logOut}
                        />
                    </div>
                </nav>
            </header>
            <div className="container" style={{ maxWidth: "1024px" }}>
                <div style={{ width: "100%", overflowX: "auto", overflowY: "auto", height: "600px" }} className="mt-2 mb-2">
                    <table>
                        <thead>
                            <tr>
                                <th><h2>Lista de Estudiantes</h2></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {students?.map((student, idx) =>
                                <tr key={idx}>
                                    <td>
                                        <div style={{ cursor: "pointer" }}>{student.profile.name.fullName}</div>
                                    </td>
                                    <td><button style={{ color: "white" }} className="btn">{submissions?.filter(sub => sub.userId === student.userId)[0].state === "TURNED_IN" ? 'ENTREGADO' : 'NO ENTREGADO'}</button></td>
                                    <td>{submissions?.filter(sub => sub.userId === student.userId)[0].state === "TURNED_IN" ? <Link to={'/addFeedback/' + courseId + "." + activityId + "." + student.userId + "." + ownerId } style={{ color: "white" }} className="btn">Retroalimentar</Link> : null}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default StudentList;