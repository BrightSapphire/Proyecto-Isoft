import { useContext, useEffect } from "react";
import { gapi } from 'gapi-script';
import { useParams } from 'react-router-dom';
import { GoogleLogout } from "react-google-login";
import CardCourseWork from "../components/CardCourseWork";
import AuthContext from "../context/authentication/authContext";
import CourseContext from "../context/courses/courseContext";
import Logo from "../img/isotipo.png";
import { Link } from "react-router-dom";
let ownerId;
let userID;
const CourseWork = () => {
    const authContext = useContext(AuthContext);
    const { autenticado, usuario, rol, logOut } = authContext;

    const courseContext = useContext(CourseContext);
    const { courses, coursesWorks, students,activityId, submissions, getCourses, getCourseWorks, getStudents, getSubmissions } = courseContext;
    ownerId = courses.ownerId;
    const { id } = useParams();
    let arrayValues = id.split(".");
    console.log(arrayValues);
    // let arrayId = id.split(".");
    let courseId = arrayValues[0];
    console.log(courseId + "  "+activityId)
   userID  = arrayValues[2];
    // let activityId = arrayId[0], courseId = arrayId[1];


    let profile = ''
    let studentSubmissions;
    let courseWorks;
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

    useEffect(() => {
        const classroomStart = () => {
            gapi.client.load('classroom', 'v1', () => {
                gapi.auth.authorize(
                    { client_id: client_id, scope: scope, immediate: inmediate },
                    authResult => {
                        if (authResult && !authResult.error) {
                            const callCourseWorks = async () => {
                                courseWorks = await gapi.client.classroom.courses.courseWork.list({ courseId: arrayValues[0], courseWorkStates: 1 });
                                getCourseWorks(courseWorks.result.courseWork);
                            }
                            callCourseWorks();
                        } else {
                            console.log("waaaaa")
                        }
                    }
                )
            });
        }
        gapi.load('client', classroomStart);
    }, [studentSubmissions]);



    useEffect(() => {
        const classroomStart = () => {
            gapi.client.load('classroom', 'v1', () => {
                gapi.auth.authorize(
                    { client_id: client_id, scope: scope, immediate: inmediate },
                    authResult => {
                        if (authResult && !authResult.error) {
                            const studentsCall = async () => {
                                studentSubmissions = await gapi.client.classroom.courses.courseWork.studentSubmissions.list({ courseId: courseId, courseWorkId: activityId })
                                // getSubmissions(studentSubmissions.result.studentSubmissions);
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


    return (
        <>
            <header>
                <nav>
                    <div style={{ display: 'flex' }}>
                        <Link to={'/'}>
                            <img src={Logo} width="55" />
                        </Link>
                        <a style={{ textTransform: 'Capitalize', cursor: 'default' }}>Bienvenido {usuario.name}<b style={{ marginLeft: 5 }}> {arrayValues[1] !== "ESTUDIANTE" ? "PROFESOR" : 'ESTUDIANTE'}</b></a>
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
            <div className="container" style={{ maxWidth: "1024px !important" }}>
                <div className="card-container__courseWork">
                    {coursesWorks?.map((courseWork, idx) => <CardCourseWork key={idx} usuario={usuario} rol={arrayValues[1]} courseWork={courseWork} userId = {userID}   />)}
                </div>
            </div>
        </>
    );
}

export default CourseWork;