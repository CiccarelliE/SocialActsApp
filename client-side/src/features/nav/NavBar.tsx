import React, { useContext } from "react";
import { Menu, Button } from "semantic-ui-react";
import EventStore from "../../app/stores/eventStore";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  const eventStore = useContext(EventStore);

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
            <Button
              onClick={eventStore.openCreateForm}
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
