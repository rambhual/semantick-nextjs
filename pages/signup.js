import React from "react";
import Link from "next/link";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchError from "../utils/catchErrors";
import { handleLogin } from "../utils/auth";
import { Segment, Button, Form, Message } from "semantic-ui-react";
const INITIAL_USER = {
  name: "",
  email: "",
  password: ""
};
function Signup() {
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
      const url = `${baseUrl}/api/signup`;
      const { name, email, password } = user;
      const payload = { name, email, password };
      const res = await axios.post(url, payload);
      handleLogin(res.data);
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
        content="Create new account!"
        header="Get started"
      />

      <Form loading={loading} error={Boolean(error)} onSubmit={handleSubmit}>
        <Message error header="Oops!" content={`${error}`}></Message>
        <Segment>
          <Form.Input
            fluid
            name="name"
            icon="user"
            iconPosition="left"
            label="Name"
            value={user.name}
            onChange={handleChange}
            placeholder="Please enter your name"
          />

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
            content="Signup"
            color="teal"
            disabled={disabled}
          ></Button>
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        Existing user ? {"  "}
        <Link href="/login">
          <a>Login here</a>
        </Link>{" "}
        instead
      </Message>
    </>
  );
}

export default Signup;
