import React, { SyntheticEvent } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";

interface IProps {
  events: IEvent[];
  selectEvent: (id: string) => void;
  deleteEvent: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submiting: boolean;
  target: string;
}

const EventList: React.FC<IProps> = ({
  events,
  selectEvent,
  deleteEvent,
  submiting,
  target,
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {events.map((event) => (
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
                  onClick={() => selectEvent(event.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={event.id}
                  loading={target === event.id && submiting}
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

export default EventList;
