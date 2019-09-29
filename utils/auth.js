import cookies from "js-cookie";
import Router from "next/router";
export function handleLogin(token) {
  cookies.set("token", token);
  Router.push("/account");
}
