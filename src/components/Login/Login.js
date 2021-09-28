import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://206.189.91.54//api/v1/auth/sign_in", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.headers["access-token"]);
        localStorage.setItem("client", res.headers["client"]);
        localStorage.setItem("expiry", res.headers["expiry"]);
        localStorage.setItem("uid", res.headers["uid"]);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email.."
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password.."
        />
        <input type="Submit" />
      </form>
    </div>
  );
}

export default Login;
