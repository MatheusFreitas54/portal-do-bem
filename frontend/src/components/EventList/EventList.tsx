import React from "react";
import EventCard, { Event } from "../PostCard/PostCard";  
import styles from "./EventList.module.css";

interface Props {
  events: Event[];
}

const EventList: React.FC<Props> = ({ events }) => (
  <div className={styles.container}>
    {events.map((ev) => (
      <EventCard key={ev.id} event={ev} />
    ))}
  </div>
);

export const EventListComponent = EventList;
export default EventList;