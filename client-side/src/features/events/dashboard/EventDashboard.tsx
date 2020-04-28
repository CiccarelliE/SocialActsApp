import React from "react";
import { Grid } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";
import EventForm from "../form/EventForm";

interface IProps {
  events: IEvent[];
  selectEvent: (id: string) => void;
  selectedEvent: IEvent | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedEvent: (event: IEvent | null) => void;
  createEvent: (event: IEvent) => void;
  editEvent: (event: IEvent) => void;
}

const EventDashboard: React.FC<IProps> = ({
  events,
  selectEvent,
  selectedEvent,
  editMode,
  setEditMode,
  setSelectedEvent,
  createEvent,
  editEvent
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} selectEvent={selectEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedEvent && !editMode && (
          <EventDetails
            event={selectedEvent}
            setEditMode={setEditMode}
            setSelectedEvent={setSelectedEvent}
          />
        )}
        {editMode && (
          <EventForm
            setEditMode={setEditMode}
            currentEvent={selectedEvent!}
            createEvent={createEvent}
            editEvent={editEvent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
