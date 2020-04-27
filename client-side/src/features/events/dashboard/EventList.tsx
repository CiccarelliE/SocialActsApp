import React from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";

interface IProps {
  events: IEvent[];
}

const EventList: React.FC<IProps> = ({ events }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {events.map(event => (
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
                <Button floated="right" content="View" color="blue" />
                <Label basic content={event.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default EventList;
