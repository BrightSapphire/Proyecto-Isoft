import CardCourse from "../components/CardCourse";
import Isotipo from "../img/isotipo.png";


import AuthContext from "../context/authentication/authContext";
import CourseContext from "../context/courses/courseContext";


import { useContext, useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { gapi } from 'gapi-script';
import { Link } from "react-router-dom";

const roleArray = [];
let userID;

const Course = () => {
    const authContext = useContext(AuthContext);
    const { autenticado, usuario, rol, signIn, logOut, usuarioAutenticado, loginRol } = authContext;
    const courseContext = useContext(CourseContext);
    const {courses, getCourses} = courseContext;

    
    let responseCourse;
    let course;
    let profile = ''
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
                            const callCourse = async () => {
                                course = await gapi.client.classroom.courses.list({ courseStates: 1 });
                                profile = await gapi.client.classroom.userProfiles.get({userId: 'me'});
                                
                                getCourses(course.result.courses);
                                
                                userID = profile.result.id;
                                console.log(userID);
                               
                                for( let index = 0; index < course.result.courses.length; index++)
                                {
                                  if( course.result.courses[index].ownerId  === profile.result.id ){
                                      roleArray[index] = "PROFESOR";
                                    
                                    
                                    }
                                
                                   else
                                   {
                                      roleArray[index] = "ESTUDIANTE";
                                    
                                     
                                   }   
                                }
                               
                              
                            }
                            callCourse();
                        } else {
                            console.log("waaaaa")
                        }
                    }
                )
            });
        }

    
        gapi.load('client', classroomStart);
    }, [course]);
    
   console.log(roleArray);
    return (
        <>
            <header>
                <nav>
                    <div style={{ display: 'flex' }}>
                        <Link to={'/'}>
                            <img src={Isotipo} width="55" />
                        </Link>
                        <a style={{ texTransform: 'Capitalize' }}>Bienvenido {usuario.name}</a>
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
            <div className="container">
                <div className="container-cards">
                    {courses?.map((course, idx) => <CardCourse key={idx}  userId = {userID}   usuario={usuario} rol= {roleArray} course={course} idx = {idx}/>)}
                </div>
            </div>
        </>
    );
}

export default Course;
