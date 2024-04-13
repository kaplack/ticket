import {Link} from 'react-router-dom'

function WorkItem({work}) {
  return (
    <div className='ticket'>
      <div>{new Date(work.createdAt).toLocaleString()}</div>
      <div>{work.title}</div>
      <div className={`status status-${work.workStatus}`}>{work.workStatus}</div>
      <Link to={`/works/${work._id}`} className='btn-btn-reverse btn-sm'>Ver</Link>
    </div>
  )
}

export default WorkItem
