import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";

import { observer } from "mobx-react-lite";
import EventStore from "../../../app/stores/eventStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const EventDashboard: React.FC = () => {
  const eventStore = useContext(EventStore);

  // if using functions or external props, need to go in the array brackets
  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]);

  if (eventStore.loadingInitial)
    return <LoadingComponent content="Loading events..." />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventDashboard);
