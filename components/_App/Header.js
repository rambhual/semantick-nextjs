import React from "react";
import Router, { useRouter } from "next/router";
import { Container, Button, Dropdown, Image, Menu } from "semantic-ui-react";
import Link from "next/link";
import NProgress from "nprogress";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Navigation({ user }) {
  const router = useRouter();
  function isActive(route) {
    return route === router.pathname;
  }
  return (
    <>
      <Menu fixed="top" inverted borderless>
        <Container>
          <Menu.Item as="a">
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ marginRight: "1.5em" }}
            />
            Dhanai Fruits Mart
          </Menu.Item>
          <Link href="/">
            <Menu.Item as="a" active={isActive("/")}>
              Home
            </Menu.Item>
          </Link>
          <Dropdown item simple text="Action">
            <Dropdown.Menu active={isActive("/create")}>
              <Link href="/create">
                <Dropdown.Item>Create Product</Dropdown.Item>
              </Link>
              <Link href="/cart" active={isActive("/cart")}>
                <Dropdown.Item>Cart</Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
          {user ? (
            <>
              <Menu.Item position="right" as="a">
                Welcome: {user.email}
              </Menu.Item>
              <Menu.Item>
                <Button size="tiny" icon="sign out alternate" />
              </Menu.Item>
            </>
          ) : (
            <>
              <Link href="/signup">
                <Menu.Item as="a" position="right">
                  Register
                </Menu.Item>
              </Link>
              <Link href="/login">
                <Menu.Item as="a">Login</Menu.Item>
              </Link>
            </>
          )}
        </Container>
      </Menu>
    </>
  );
}

export default Navigation;
