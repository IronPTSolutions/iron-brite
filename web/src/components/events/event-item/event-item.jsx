import { Link } from 'react-router-dom';
import dayjs from '../../../lib/dayjs';

import './event-item.css';

function EventItem({ event, onDelete }) {
  return (
    <div className="card event-item">
      <img src={event.poster} className="card-img-top" alt={event.title} />
      <div className="card-body">
        <h5 className="card-title mb-1 fw-light text-break"><Link to={`/events/${event.id}`}>{event.title}</Link></h5>
        <p className='mb-0 fs-xs'><strong>{dayjs(event.eventDate).format('lll')}</strong></p>
        <p className="text-muted fw-lighter fs-xs">{event.location}</p>
        <div className="d-flex gap-1 flex-wrap mb-1">
          {event.categories?.map((category) => (
            <span key={category} className='badge text-bg-light'>{category}</span>
          ))}
        </div>
        <button className='btn btn-sm btn-danger' onClick={() => onDelete(event)}>delete</button>
      </div>
    </div>
  )
}

export default EventItem;