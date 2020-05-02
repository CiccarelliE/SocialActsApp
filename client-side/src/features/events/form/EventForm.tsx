import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";
import { v4 as uuid } from "uuid";
import EventStore from "../../../app/stores/eventStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailsParams {
  id: string;
}

// currentEvent is going to be the var for if there is an exisiting event

const EventForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const eventStore = useContext(EventStore);
  const {
    createEvent,
    editEvent,
    submitting,
    selectedEvent: currentEvent,
    loadEvent,
    clearEventFields,
  } = eventStore;

  // modifyEvent is the state name and setModifyEvent is the action to alter state
  // modifyEvent will be the same type as all of the events in Event.ts interface
  const [modifyEvent, setModifyEvent] = useState<IEvent>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && modifyEvent.id.length === 0) {
      loadEvent(match.params.id).then(() => {
        currentEvent && setModifyEvent(currentEvent);
      });
    }
    return () => {
      clearEventFields();
    };
  }, [
    loadEvent,
    match.params.id,
    currentEvent,
    clearEventFields,
    modifyEvent.id.length,
  ]);

  const handleSubmit = () => {
    // must used modifyEvent.id because thats the new state name for creating a new event
    if (modifyEvent.id.length === 0) {
      let newEvent = {
        ...modifyEvent,
        id: uuid(),
      };
      createEvent(newEvent).then(() => {
        history.push(`/events/${newEvent.id}`);
      });
    } else {
      editEvent(modifyEvent).then(() => {
        history.push(`/events/${modifyEvent.id}`);
      });
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //destructuring
    const { name, value } = event.currentTarget;
    // this allows for change in forms. React works with virtural dom, this allows the change to the real dom
    setModifyEvent({ ...modifyEvent, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={modifyEvent.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={modifyEvent.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={modifyEvent.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={modifyEvent.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={modifyEvent.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={modifyEvent.venue}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push("/events")}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(EventForm);
