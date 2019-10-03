import React from "react";
import axios from "axios";
import { handleLogin } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import Link from "next/link";
import catchError from "../utils/catchErrors";
import { Segment, Button, Form, Message } from "semantic-ui-react";
const INITIAL_USER = {
  email: "",
  password: ""
};
function Login() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(preState => ({ ...preState, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const url = `${baseUrl}/api/login`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchError(error, setError);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Message
        attached
        color="teal"
        content="Log in with your email and password!"
        header="Welcome Back!"
      />

      <Form loading={loading} error={Boolean(error)} onSubmit={handleSubmit}>
        <Message error header="Oops!" content={`${error}`}></Message>
        <Segment>
          <Form.Input
            fluid
            name="email"
            icon="envelope open outline"
            iconPosition="left"
            label="Email"
            onChange={handleChange}
            type="email"
            value={user.email}
            placeholder="Please enter your email address"
          />

          <Form.Input
            fluid
            name="password"
            icon="lock"
            iconPosition="left"
            label="Password"
            onChange={handleChange}
            value={user.password}
            type="password"
            placeholder="Please enter your password"
          />

          <Button
            icon="signup"
            type="submit"
            content="Login"
            color="teal"
            disabled={disabled || loading}
          ></Button>
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        New user ? {"  "}
        <Link href="/signup">
          <a>Create new</a>
        </Link>{" "}
        instead
      </Message>
    </>
  );
}

export default Login;
