import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EventStore from "../../../app/stores/eventStore";
import { Link } from "react-router-dom";

const EventList: React.FC = () => {
  // bring in store
  const eventStore = useContext(EventStore);
  const { eventsByDate, deleteEvent, submitting, target } = eventStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {eventsByDate.map((event) => (
          <Item key={event.id}>
            <Item.Content>
              <Item.Header as="a">{event.title}</Item.Header>
              <Item.Meta>{event.date}</Item.Meta>
              <Item.Description>
                <div>{event.description}</div>
                <div>
                  {event.city}, {event.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/events/${event.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={event.id}
                  loading={target === event.id && submitting}
                  onClick={(e) => deleteEvent(e, event.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={event.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(EventList);
