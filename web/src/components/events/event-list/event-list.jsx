import { useEffect, useState } from "react";
import EventItem from "../event-item/event-item";
import * as IronBriteApi from '../../../services/api-service';

function EventList({ className = '', city, max, page }) {
  const [events, setEvents] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    console.log(`RELOADING... ${{ city, max }}`);
    IronBriteApi.listEvents({ city, limit: max, page })
      .then((events) => setEvents(events))
      .catch((error) => console.error(error))
  }, [city, max, reload, page]);

  const handleEventDeletion = (event) => {+
    IronBriteApi.deleteEvent(event.id)
      .then(() => setReload(!reload))
      .catch((error) => console.error(error))
  }

  return (
    <div className={`d-flex flex-wrap gap-3 ${className}`}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} onDelete={handleEventDeletion}/>
      ))} 
    </div>
  );
}

export default EventList;