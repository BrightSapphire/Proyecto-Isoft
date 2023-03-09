import './App.css';
import Home from './Pages/Home';
import routes from './helpers/Routes';
import Course from './Pages/Course';
import StudentList from './Pages/StudentList';
import AddFeedback from './Pages/AddFeedback';
import Feedback from './Pages/Feedback';
import CourseWork from './Pages/CourseWork';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthState from "./context/authentication/authState";
import CourseState from "./context/courses/courseState";
import PrivateRoute from './routers/PrivateRoute';
const App = () => {

  return (
    <CourseState>
      <AuthState>
        <BrowserRouter>
          <Switch>
            <Route
              path={routes.home}
              component={Home}
              exact
            />
            <PrivateRoute
              path={routes.courses}
              component={Course}
              exact
            />
            <PrivateRoute
              path={'/courseWork/:id'}
              component={CourseWork}
              exact
            />
            <PrivateRoute
              path={'/studentList/:id'}
              component={StudentList}
              exact
            />
            <PrivateRoute
              path={'/addFeedback/:id'}
              component={AddFeedback}
              exact
            />
            <PrivateRoute
              path={'/feedback/:id'}
              component={Feedback}
              exact
            />
          </Switch>
        </BrowserRouter>
      </AuthState >
    </CourseState>
  );
}

export default App;

