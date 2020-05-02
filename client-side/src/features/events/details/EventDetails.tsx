import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import EventStore from "../../../app/stores/eventStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventDetailsHeader from "./EventDetailsHeader";
import EventDetailsInfo from "./EventDetailsInfo";
import EventDetailsChat from "./EventDetailsChat";
import EventDetailsSideBar from "./EventDetailsSideBar";

interface DetailParams {
  id: string;
}

const EventDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const eventStore = useContext(EventStore);
  const { selectedEvent: event, loadEvent, loadingInitial } = eventStore;

  useEffect(() => {
    loadEvent(match.params.id);
  }, [loadEvent, match.params.id]);

  if (loadingInitial || !event)
    return <LoadingComponent content="Loading Event..." />;

  return (
    <Grid>
      <GridColumn width={10}>
        <EventDetailsHeader event={event} />
        <EventDetailsInfo event={event} />
        <EventDetailsChat />
      </GridColumn>
      <GridColumn width={6}>
        <EventDetailsSideBar />
      </GridColumn>
    </Grid>
  );
};

export default observer(EventDetails);
