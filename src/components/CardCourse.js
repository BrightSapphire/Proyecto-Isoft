import { Link } from "react-router-dom";
import Logo from "../img/logo.png";

const CardCourse = (props) => {
    const {usuario, rol, userId, course, idx} = props;
    
    return (
        <div className="card">
            <div className="header-card mb-1 mt-2">
                <img src={Logo} width="150" />
            </div>
            <div className="body-header mb-1">
                <h4>{rol[idx] === "ESTUDIANTE" ? 'ESTUDIANTE' : 'PROFESOR'}-<b style={{textTransform: 'uppercase'}}>{course.name}</b></h4>
            </div>
            <Link to={'/courseWork/'+course.id+"."+rol[idx]+"."+ userId} className="btn btn-primary mb-2">Ir a la clase</Link>
        </div>
    );
}

export default CardCourse;