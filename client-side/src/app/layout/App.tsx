import React, { Fragment } from "react";
import "mobx-react-lite/batchingForReactDom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";

import { observer } from "mobx-react-lite";

//routes
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventForm from "../../features/events/form/EventForm";
import EventDetails from "../../features/events/details/EventDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetails} />
              <Route
                key={location.key}
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
