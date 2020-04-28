import React from "react";
import { Menu, Button } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Menu.Item>
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
            <Button onClick={openCreateForm} positive content="Create Event" />
          </Menu.Item>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
