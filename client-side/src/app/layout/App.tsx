import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";

import { Container } from "semantic-ui-react";

import { IEvent } from "../models/event";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submiting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectEvent = (id: string) => {
    setSelectedEvent(events.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedEvent(null);
    setEditMode(true);
  };

  const handleCreateActivity = (event: IEvent) => {
    setSubmitting(true);
    agent.Events.create(event)
      .then(() => {
        setEvents([...events, event]);
        // after the event has been created, this will display the newly created event
        setSelectedEvent(event);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditEvent = (event: IEvent) => {
    setSubmitting(true);
    agent.Events.update(event)
      .then(() => {
        setEvents([
          ...events.filter((eventItem) => eventItem.id !== event.id),
          event,
        ]);
        setSelectedEvent(event);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteEvent = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(e.currentTarget.name);
    agent.Events.delete(id)
      .then(() => {
        // this spreads the current events and then filters through to return all of the events with ids that do not match the one that is going to be deleted
        setEvents([...events.filter((e) => e.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    // check agent.ts to understand
    agent.Events.list()
      .then((response) => {
        let events: IEvent[] = [];
        response.forEach((event) => {
          // looping through response data and spliting the datetime at the period, we only want the first part so you add [0] at the end
          event.date = event.date.split(".")[0];
          events.push(event);
        });
        setEvents(events);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading events..." />;

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
          submiting={submiting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
