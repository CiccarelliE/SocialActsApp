import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EventStore from "../../../app/stores/eventStore";

import EventListItem from "./EventListItem";

const EventList: React.FC = () => {
  // bring in store
  const eventStore = useContext(EventStore);
  const { eventsByDate } = eventStore;

  return (
    <Fragment>
      {eventsByDate.map(([group, events]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Item.Group divided>
            {events.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(EventList);
