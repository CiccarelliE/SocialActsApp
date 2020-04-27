import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

export const NavBar = () => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "1.2em" }}
            />
            Local
          </Menu.Item>
          <Menu.Item name="Events" />
          <Menu.Item>
            <Button positive content="Create Event" />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};
