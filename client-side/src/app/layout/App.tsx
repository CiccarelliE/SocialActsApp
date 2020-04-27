import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import { IEvent } from "../models/event";
import { NavBar } from "../../features/nav/NavBar";
import EventDashboard from "../../features/events/dashboard/EventDashboard";

const App = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    axios.get<IEvent[]>("http://localhost:5000/api/events").then(response => {
      setEvents(response.data);
    });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <EventDashboard events={events} />
      </Container>
    </Fragment>
  );
};

export default App;
