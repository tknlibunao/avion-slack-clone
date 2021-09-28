import React, { useState } from "react";
import Input from "../Input/Input";
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
    <div style={divStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <Input
          style={inputStyle}
          type="text"
          placeholder="Enter email.."
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          style={inputStyle}
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input type="Submit" value="Login" style={btnStyle} readOnly={true} />
      </form>
    </div>
  );
}

const divStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  backgroundColor: "white",
  justifyContent: "center",
  alignItems: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "400px",
  height: "400px",
  justifyContent: "center",
  alignItems: "center",
};

const inputStyle = {
  fontSize: "1.5rem",
  margin: "0.5rem",
  outline: "0",
  paddingLeft: "0.5rem",
};

const btnStyle = {
  backgroundColor: "#4A154B",
  border: "0",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: "3px",
  cursor: "pointer",
};

export default Login;
