import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { IEvent } from "../../../app/models/event";

const EventListItem: React.FC<{ event: IEvent }> = ({ event }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{event.title}</Item.Header>
              <Item.Description>Hosted by John</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {event.date}
        <Icon name="marker" /> {event.venue}, {event.city}
      </Segment>
      <Segment>Attendees will go here</Segment>
      <Segment clearing>
        <span>{event.description}</span>
        <Button
          as={Link}
          to={`/events/${event.id}`}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
