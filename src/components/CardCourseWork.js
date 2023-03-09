import { useState } from 'react';
import chevronExpand from '../img/chevron_expand.png';
import chevronClose from '../img/chevron_close.png';
import { Link } from 'react-router-dom';
const CardCourseWork = (props) => {
    const { usuario, userId, courseWork, rol, courseId, } = props;
    const [open, setOpen] = useState(false);
    return (
        <div className="card_courseWork mb-2">
            <div className="header-card__courseWork">
                <div>
                    <h3 style={{ display: 'flex', alignItems: 'center' }}><p style={{ marginRight: 10 }}>{courseWork?.title} </p>  {rol === "ESTUDIANTE" ? null : <Link className='btn btn-primary' to={'/studentList/' + courseWork.id + "." + courseWork.courseId + "." + userId }>Ver Estudiantes</Link>}</h3>
                </div>
                <button onClick={() => setOpen(!open)}>
                    {open ? <img src={chevronExpand} width="40" /> : <img src={chevronClose} width="40" />}
                </button>
            </div>
            <div style={open ? { display: 'none' } : { display: 'block' }}>
                <div className="body-card__courseWork">
                    {courseWork?.description}
                </div>
                {rol === "ESTUDIANTE" ? <center>
                   <Link to = {'/Feedback/'+courseId+'.'+courseWork.id+'.'+userId}  className="btn btn-primary mb-1" >Ver retroalimentacion</Link>
                </center> : null}
            </div>
        </div>
    );
}

export default CardCourseWork;