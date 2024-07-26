import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import {Link, useNavigate} from 'react-router-dom'
import { deleteWork, getWorks } from "../../features/work/workSlice"
import {toast} from 'react-toastify'
import { FaMapPin, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import utils from '../../utils/utils';

function EmpWorkItem({work}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteWork(work._id))
            .then(()=>{
                toast.success("El empleo fue eliminado")
                dispatch(getWorks())
            })
            .catch(toast.error)
    }

  return (
    <tr>
        <td>
            <div className="twm-bookmark-list">
                
                <div className="twm-mid-content">
                    <a href="#" className="twm-job-title">
                        <h4>{work.title}</h4>
                        <p className="twm-bookmark-address">
                            <FaMapPin />{work.workPlace + ", " + work.city + " - " + work.country}
                        </p>
                    </a>
                </div>
            </div>
        </td>
        <td>{work.jobCategory}</td>
        <td><div className="twm-jobs-category"><span className="twm-bg-green">{work.workTime}</span></div></td>
        <td><a href="#" className="site-text-primary">pronto</a></td>
        <td>
            <div>{utils.cambiarFormatoFecha(utils.convertDate(work.iDate))}</div>
            <div>{utils.cambiarFormatoFecha(utils.convertDate(work.fDate))}</div>
        </td>
        <td>
            <div className="twm-table-controls">
                <ul className="twm-DT-controls-icon list-unstyled">
                    <li>
                        <Link to={`work-detail/${work._id}`} ><FaEye /></Link>
                    </li>
                    <li>
                        <Link to={`work-edit/${work._id}`}><FaEdit /></Link>
                    </li>
                    <li>
                        <button onClick={handleDelete}>
                            <FaTrashAlt />
                        </button>
                    </li>
                </ul>
            </div>
        </td>
    </tr>
  )
}

export default EmpWorkItem
