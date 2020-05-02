import React from "react";
import { Menu, Button } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Menu.Item>
          <Menu.Item header as={NavLink} exact to="/">
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "1.2em" }}
            />
            Local
          </Menu.Item>
          <Menu.Item name="Events" as={NavLink} to="/events" />
          <Menu.Item>
            <Button
              as={NavLink}
              to="/createEvent"
              positive
              content="Create Event"
            />
          </Menu.Item>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default observer(NavBar);
