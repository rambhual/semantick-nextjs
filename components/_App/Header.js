import React from "react";
import { useRouter } from "next/router";

import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const isActive = route => {
    return route == router.pathname;
  };

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
          <Menu.Item
            style={{ fontSize: "1.4em" }}
            header
            active={isActive("/")}
          >
            Dhanai Fruits Mart
          </Menu.Item>
        </Link>

        <Menu.Menu position="right">
          {user ? (
            <>
              <Link href="/cart">
                <Menu.Item name="Cart" active={isActive("/cart")} />
              </Link>
              <Link href="/create">
                <Menu.Item name="Create" active={isActive("/create")} />
              </Link>
              <Link href="/account">
                <Menu.Item name="Account" active={isActive("/account")} />
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
                <Menu.Item name="Login" active={isActive("/login")} />
              </Link>
              <Link href="/signup">
                <Menu.Item name="Sign up" active={isActive("/signup")} />
              </Link>
            </>
          )}
        </Menu.Menu>
      </Menu>
    </>
  );
}

export default Header;
