import React from "react";

import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";

function Header() {
  const [user, setUser] = React.useState(false);
  return (
    <>
      <Menu
        fluid
        id="menu"
        inverted
        borderless
        style={{ borderRadius: 0, minHeight: "4em" }}
      >
        <Link href="/">
          <Menu.Item style={{ fontSize: "1.4em" }} header>
            Dhanai Fruits Mart
          </Menu.Item>
        </Link>

        <Menu.Menu position="right">
          {user ? (
            <>
              <Link href="/cart">
                <Menu.Item name="Cart" />
              </Link>
              <Link href="/create">
                <Menu.Item name="Create" />
              </Link>
              <Link href="/account">
                <Menu.Item name="Account" />
              </Link>

              <Menu.Item>
                <Button as="a" size="tiny">
                  Log out
                </Button>
              </Menu.Item>
            </>
          ) : (
            <>
              <Link href="/login">
                <Menu.Item name="Login" />
              </Link>
              <Link href="/signup">
                <Menu.Item name="Sign up" />
              </Link>
            </>
          )}
        </Menu.Menu>
      </Menu>
    </>
  );
}

export default Header;
