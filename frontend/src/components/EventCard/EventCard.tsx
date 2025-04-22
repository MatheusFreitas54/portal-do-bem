import React from "react";
import styles from "./EventCard.module.css";

export interface Event {
  id: string;
  title: string;
  image: string;
  dateStart: string;
  dateEnd?: string;
  location: string;
  organizer?: string;
}

interface Props {
  event: Event;
}

const EventCard: React.FC<Props> = ({ event }) => {
  return (
    <div className={styles.card}>
      <img src={event.image} alt={event.title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{event.title}</h3>
        <div className={styles.dates}>
          <span>{event.dateStart}</span>
          {event.dateEnd && <span>– {event.dateEnd}</span>}
        </div>
        <p className={styles.location}>{event.location}</p>
        {event.organizer && (
          <p className={styles.organizer}>{event.organizer}</p>
        )}
      </div>
    </div>
  );
};

export default EventCard;
