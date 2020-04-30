import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import EventStore from "../../../app/stores/eventStore";
import { observer } from "mobx-react-lite";

const EventDetails: React.FC = () => {
  const eventStore = useContext(EventStore);
  const {
    selectedEvent: event,
    openEditForm,
    cancelSelectedEvent,
  } = eventStore;

  return (
    <Card fluid>
      <Image
        src={`./assets/categoryImages/${event!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{event!.title}</Card.Header>
        <Card.Meta>
          <span>{event!.date}</span>
        </Card.Meta>
        <Card.Description>{event!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(event!.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedEvent}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(EventDetails);
