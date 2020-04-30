import React, { useEffect, Fragment, useContext } from "react";
import "mobx-react-lite/batchingForReactDom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import LoadingComponent from "./LoadingComponent";
import EventStore from "../stores/eventStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const eventStore = useContext(EventStore);

  // if using functions or external props, need to go in the array brackets
  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]);

  if (eventStore.loadingInitial)
    return <LoadingComponent content="Loading events..." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <EventDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
