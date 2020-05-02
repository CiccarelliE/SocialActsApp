import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import EventStore from "../../../app/stores/eventStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface DetailParams {
  id: string;
}

const EventDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const eventStore = useContext(EventStore);
  const { selectedEvent: event, loadEvent, loadingInitial } = eventStore;

  useEffect(() => {
    loadEvent(match.params.id);
  }, [loadEvent, match.params.id]);

  if (loadingInitial || !event)
    return <LoadingComponent content="Loading Event..." />;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${event!.category}.jpg`}
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
            as={Link}
            to={`/manage/${event.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push("/events")}
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
