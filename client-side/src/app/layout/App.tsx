import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import { IEvent } from "../models/event";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";

const App = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectEvent = (id: string) => {
    setSelectedEvent(events.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedEvent(null);
    setEditMode(true);
  };

  const handleCreateActivity = (event: IEvent) => {
    setEvents([...events, event]);
    // after the event has been created, this will display the newly created event
    setSelectedEvent(event);
    setEditMode(false);
  };

  const handleEditEvent = (event: IEvent) => {
    setEvents([
      ...events.filter((eventItem) => eventItem.id !== event.id),
      event,
    ]);
    setSelectedEvent(event);
    setEditMode(false);
  };

  const handleDeleteEvent = (id: string) => {
    // this spreads the current events and then filters through to return all of the events with ids that do not match the one that is going to be deleted
    setEvents([...events.filter((e) => e.id !== id)]);
  };

  useEffect(() => {
    axios.get<IEvent[]>("http://localhost:5000/api/events").then((response) => {
      let events: IEvent[] = [];
      response.data.forEach((event) => {
        // looping through response data and spliting the datetime at the period, we only want the first part so you add [0] at the end
        event.date = event.date.split(".")[0];
        events.push(event);
      });
      setEvents(events);
    });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <EventDashboard
          events={events}
          selectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedEvent={setSelectedEvent}
          createEvent={handleCreateActivity}
          editEvent={handleEditEvent}
          deleteEvent={handleDeleteEvent}
        />
      </Container>
    </Fragment>
  );
};

export default App;
