import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IEventFormValues, EventFormValues } from "../../../app/models/event";
import { v4 as uuid } from "uuid";
import EventStore from "../../../app/stores/eventStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/utils/util";

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
  const [modifyEvent, setModifyEvent] = useState(new EventFormValues());

  //loading effect
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadEvent(match.params.id)
        .then((event) => {
          setModifyEvent(new EventFormValues(event));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loadEvent, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...modifyEvent } = values;
    modifyEvent.date = dateAndTime;
    if (!modifyEvent.id) {
      let newEvent = {
        ...modifyEvent,
        id: uuid(),
      };
      createEvent(newEvent);
    } else {
      editEvent(modifyEvent);
    }
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment clearing>
          <FinalForm
            initialValues={modifyEvent}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={modifyEvent.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  rows={3}
                  placeholder="Description"
                  value={modifyEvent.description}
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  placeholder="Category"
                  options={category}
                  value={modifyEvent.category}
                  component={SelectInput}
                />
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={modifyEvent.date}
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={modifyEvent.time}
                  />
                </Form.Group>
                <Field
                  component={TextInput}
                  name="city"
                  placeholder="City"
                  value={modifyEvent.city}
                />
                <Field
                  component={TextInput}
                  name="venue"
                  placeholder="Venue"
                  value={modifyEvent.venue}
                />
                <Button
                  loading={submitting}
                  disabled={loading}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={
                    modifyEvent.id
                      ? () => history.push(`/events/${modifyEvent.id}`)
                      : () => history.push("/events")
                  }
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventForm);
